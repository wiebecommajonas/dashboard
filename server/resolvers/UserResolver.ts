import 'reflect-metadata';
import {
  Arg, Authorized, Ctx, Mutation, Query, Resolver,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from '../utils/context/context';
import { User, NewUser, LoginUser } from '../schema/User';
import { AuthPayload } from '../schema/Authentication';
import defaultSettings from '../utils/defaults/defaultSettings';

@Resolver(User)
export default class UserResolver {
  @Query(() => User)
  async user(@Arg('id') id: string, @Ctx() context: Context): Promise<User> {
    const user = await context.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('No such user found');
    }
    return user;
  }

  @Authorized(['USER'])
  @Query(() => User)
  async self(@Ctx() context: Context): Promise<User> {
    if (!context.userId) {
      throw new Error('Not authorized');
    }
    const self = await context.prisma.user.findUnique({ where: { id: context.userId } });
    if (!self) {
      throw new Error('No such user found');
    }

    return self;
  }

  @Mutation(() => AuthPayload)
  async login(@Arg('data') loginUser: LoginUser, @Ctx() context: Context): Promise<AuthPayload> {
    const user = await context.prisma.user.findUnique({ where: { email: loginUser.email } });
    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(loginUser.password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET!);

    return {
      token,
      user,
    };
  }

  @Mutation(() => AuthPayload)
  async signup(@Arg('data') newUser: NewUser, @Ctx() context: Context): Promise<AuthPayload> {
    const password = await bcrypt.hash(newUser.password, 10);

    const settings = await context.prisma.setting.create({ data: defaultSettings });
    const user = await context.prisma.user.create({
      data: {
        ...newUser,
        password,
        settingsId: settings.id,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET!);

    return {
      token,
      user,
    };
  }
}

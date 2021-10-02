import 'reflect-metadata';
import {
  Arg,
  Authorized, Ctx, Mutation, Query, Resolver,
} from 'type-graphql';
import { NewSettings, Settings } from '../schema/Settings';
import { Context } from '../utils/context/context';

@Resolver(Settings)
export default class SettingsResolver {
  @Authorized(['USER'])
  @Query(() => Settings)
  async settings(@Ctx() context: Context): Promise<Settings> {
    const user = await context.prisma.user.findUnique({ where: { id: context.userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const settings = await context.prisma.setting.findUnique({ where: { id: user.settingsId } });
    if (!settings) {
      throw new Error('No settings found');
    }
    return settings;
  }

  @Authorized(['USER'])
  @Mutation(() => Settings)
  async updateSettings(@Arg('data') newSettings: NewSettings, @Ctx() context: Context): Promise<Settings> {
    const user = await context.prisma.user.findUnique({ where: { id: context.userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const settings = await context.prisma.setting.update({
      where: { id: user.settingsId },
      data: newSettings,
    });
    if (!settings) {
      throw new Error('Failed to update settings');
    }

    return settings;
  }
}

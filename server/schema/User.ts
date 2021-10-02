import {
  Field, ID, InputType, ObjectType,
} from 'type-graphql';
import { Settings } from './Settings';

@ObjectType()
export class User {
  @Field(() => ID!)
  id!: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  settingsId!: string;
}

@InputType()
export class NewUser implements Partial<User> {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class LoginUser implements Partial<User> {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

export default { User, NewUser, LoginUser };

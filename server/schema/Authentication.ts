import { Field, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class AuthPayload {
  @Field()
  token!: string;

  @Field()
  user!: User;
}

export default { AuthPayload };

import {
  Field, ID, InputType, ObjectType,
} from 'type-graphql';

@ObjectType()
export class Settings {
  @Field(() => ID!)
  id!: string;

  @Field()
  city!: string;

  @Field()
  units!: string;
}

@InputType()
export class NewSettings implements Partial<Settings> {
  @Field()
  city!: string;

  @Field()
  units!: string;
}

export default { Settings, NewSettings };

import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Info {
  @Field()
  info!: string;
}

export default { Info };

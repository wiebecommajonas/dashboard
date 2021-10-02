import 'reflect-metadata';
import { Query, Resolver } from 'type-graphql';
import { Info } from '../schema/schema';

@Resolver(Info)
export default class InfoResolver {
  @Query()
  info(): string {
    return 'Version: 0.0.1';
  }
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmCreateInput } from "../../../inputs/FarmCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneFarmArgs {
  @TypeGraphQL.Field((_type) => FarmCreateInput, {
    nullable: false,
  })
  data!: FarmCreateInput;
}

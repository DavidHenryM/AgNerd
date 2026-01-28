import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmCreateManyInput } from "../../../inputs/FarmCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyFarmArgs {
  @TypeGraphQL.Field((_type) => [FarmCreateManyInput], {
    nullable: false,
  })
  data!: FarmCreateManyInput[];
}

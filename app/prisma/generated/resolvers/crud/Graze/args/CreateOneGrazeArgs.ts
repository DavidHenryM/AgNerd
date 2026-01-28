import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeCreateInput } from "../../../inputs/GrazeCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneGrazeArgs {
  @TypeGraphQL.Field((_type) => GrazeCreateInput, {
    nullable: false,
  })
  data!: GrazeCreateInput;
}

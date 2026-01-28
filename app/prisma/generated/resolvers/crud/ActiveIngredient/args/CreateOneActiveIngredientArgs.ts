import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientCreateInput } from "../../../inputs/ActiveIngredientCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneActiveIngredientArgs {
  @TypeGraphQL.Field((_type) => ActiveIngredientCreateInput, {
    nullable: false,
  })
  data!: ActiveIngredientCreateInput;
}

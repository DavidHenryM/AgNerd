import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientCreateManyInput } from "../../../inputs/ActiveIngredientCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyActiveIngredientArgs {
  @TypeGraphQL.Field((_type) => [ActiveIngredientCreateManyInput], {
    nullable: false,
  })
  data!: ActiveIngredientCreateManyInput[];
}

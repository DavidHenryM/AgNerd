import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientWhereInput } from "../../inputs/ActiveIngredientWhereInput";

@TypeGraphQL.ArgsType()
export class ChemicalProductCountActiveIngredientsArgs {
  @TypeGraphQL.Field((_type) => ActiveIngredientWhereInput, {
    nullable: true,
  })
  where?: ActiveIngredientWhereInput | undefined;
}

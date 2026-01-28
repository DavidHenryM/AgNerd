import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientCreateInput } from "../../../inputs/ActiveIngredientCreateInput";
import { ActiveIngredientUpdateInput } from "../../../inputs/ActiveIngredientUpdateInput";
import { ActiveIngredientWhereUniqueInput } from "../../../inputs/ActiveIngredientWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneActiveIngredientArgs {
  @TypeGraphQL.Field((_type) => ActiveIngredientWhereUniqueInput, {
    nullable: false,
  })
  where!: ActiveIngredientWhereUniqueInput;

  @TypeGraphQL.Field((_type) => ActiveIngredientCreateInput, {
    nullable: false,
  })
  create!: ActiveIngredientCreateInput;

  @TypeGraphQL.Field((_type) => ActiveIngredientUpdateInput, {
    nullable: false,
  })
  update!: ActiveIngredientUpdateInput;
}

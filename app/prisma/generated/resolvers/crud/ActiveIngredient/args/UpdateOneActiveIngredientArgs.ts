import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientUpdateInput } from "../../../inputs/ActiveIngredientUpdateInput";
import { ActiveIngredientWhereUniqueInput } from "../../../inputs/ActiveIngredientWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneActiveIngredientArgs {
  @TypeGraphQL.Field((_type) => ActiveIngredientUpdateInput, {
    nullable: false,
  })
  data!: ActiveIngredientUpdateInput;

  @TypeGraphQL.Field((_type) => ActiveIngredientWhereUniqueInput, {
    nullable: false,
  })
  where!: ActiveIngredientWhereUniqueInput;
}

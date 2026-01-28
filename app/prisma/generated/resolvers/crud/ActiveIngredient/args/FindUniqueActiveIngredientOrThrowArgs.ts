import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ActiveIngredientWhereUniqueInput } from "../../../inputs/ActiveIngredientWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueActiveIngredientOrThrowArgs {
  @TypeGraphQL.Field((_type) => ActiveIngredientWhereUniqueInput, {
    nullable: false,
  })
  where!: ActiveIngredientWhereUniqueInput;
}

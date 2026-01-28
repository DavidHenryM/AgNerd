import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientWhereInput } from "../inputs/ActiveIngredientWhereInput";

@TypeGraphQL.InputType("ActiveIngredientListRelationFilter", {})
export class ActiveIngredientListRelationFilter {
  @TypeGraphQL.Field((_type) => ActiveIngredientWhereInput, {
    nullable: true,
  })
  every?: ActiveIngredientWhereInput | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientWhereInput, {
    nullable: true,
  })
  some?: ActiveIngredientWhereInput | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientWhereInput, {
    nullable: true,
  })
  none?: ActiveIngredientWhereInput | undefined;
}

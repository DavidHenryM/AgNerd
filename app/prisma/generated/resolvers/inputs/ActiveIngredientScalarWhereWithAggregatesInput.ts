import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumIngredientWithAggregatesFilter } from "../inputs/EnumIngredientWithAggregatesFilter";
import { FloatWithAggregatesFilter } from "../inputs/FloatWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("ActiveIngredientScalarWhereWithAggregatesInput", {})
export class ActiveIngredientScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(
    (_type) => [ActiveIngredientScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  AND?: ActiveIngredientScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ActiveIngredientScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  OR?: ActiveIngredientScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ActiveIngredientScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  NOT?: ActiveIngredientScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumIngredientWithAggregatesFilter, {
    nullable: true,
  })
  ingredient?: EnumIngredientWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatWithAggregatesFilter, {
    nullable: true,
  })
  mgPermL?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  productId?: StringWithAggregatesFilter | undefined;
}

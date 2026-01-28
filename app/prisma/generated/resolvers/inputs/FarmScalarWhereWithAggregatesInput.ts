import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("FarmScalarWhereWithAggregatesInput", {})
export class FarmScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [FarmScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: FarmScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [FarmScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: FarmScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [FarmScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: FarmScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  name?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  businessName?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  lotSectionPlan?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  abn?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  acn?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  pic?: StringNullableWithAggregatesFilter | undefined;
}

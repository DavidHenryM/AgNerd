import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeNullableWithAggregatesFilter } from "../inputs/DateTimeNullableWithAggregatesFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("PregnancyScalarWhereWithAggregatesInput", {})
export class PregnancyScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [PregnancyScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: PregnancyScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: PregnancyScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: PregnancyScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  earliestPossibleConception?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  latestPossibleConception?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  conception?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  dueDate?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  earliestPossibleBirth?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  latestPossibleBirth?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  parentId?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  pregnancySireId?: StringWithAggregatesFilter | undefined;
}

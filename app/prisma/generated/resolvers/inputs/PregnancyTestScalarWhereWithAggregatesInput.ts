import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { EnumPregnancyTestResultWithAggregatesFilter } from "../inputs/EnumPregnancyTestResultWithAggregatesFilter";
import { EnumPregnancyTestTypeWithAggregatesFilter } from "../inputs/EnumPregnancyTestTypeWithAggregatesFilter";
import { FloatNullableWithAggregatesFilter } from "../inputs/FloatNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("PregnancyTestScalarWhereWithAggregatesInput", {})
export class PregnancyTestScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [PregnancyTestScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: PregnancyTestScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: PregnancyTestScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: PregnancyTestScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  testDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumPregnancyTestTypeWithAggregatesFilter, {
    nullable: true,
  })
  testType?: EnumPregnancyTestTypeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  resultDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumPregnancyTestResultWithAggregatesFilter, {
    nullable: true,
  })
  result?: EnumPregnancyTestResultWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  pregnancyId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableWithAggregatesFilter, {
    nullable: true,
  })
  cost?: FloatNullableWithAggregatesFilter | undefined;
}

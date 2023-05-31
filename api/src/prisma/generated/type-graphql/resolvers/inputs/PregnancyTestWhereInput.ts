import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumPregnancyTestResultFilter } from "../inputs/EnumPregnancyTestResultFilter";
import { EnumPregnancyTestTypeFilter } from "../inputs/EnumPregnancyTestTypeFilter";
import { FloatNullableFilter } from "../inputs/FloatNullableFilter";
import { PregnancyRelationFilter } from "../inputs/PregnancyRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("PregnancyTestWhereInput", {
  isAbstract: true,
})
export class PregnancyTestWhereInput {
  @TypeGraphQL.Field((_type) => [PregnancyTestWhereInput], {
    nullable: true,
  })
  AND?: PregnancyTestWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestWhereInput], {
    nullable: true,
  })
  OR?: PregnancyTestWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestWhereInput], {
    nullable: true,
  })
  NOT?: PregnancyTestWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  testDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumPregnancyTestTypeFilter, {
    nullable: true,
  })
  testType?: EnumPregnancyTestTypeFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  resultDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumPregnancyTestResultFilter, {
    nullable: true,
  })
  result?: EnumPregnancyTestResultFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  pregnancyId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableFilter, {
    nullable: true,
  })
  cost?: FloatNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => PregnancyRelationFilter, {
    nullable: true,
  })
  pregnancy?: PregnancyRelationFilter | undefined;
}

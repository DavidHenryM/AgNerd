import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { LivestockUnitListRelationFilter } from "../inputs/LivestockUnitListRelationFilter";
import { PregnancyTestListRelationFilter } from "../inputs/PregnancyTestListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("PregnancyWhereInput", {})
export class PregnancyWhereInput {
  @TypeGraphQL.Field((_type) => [PregnancyWhereInput], {
    nullable: true,
  })
  AND?: PregnancyWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyWhereInput], {
    nullable: true,
  })
  OR?: PregnancyWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyWhereInput], {
    nullable: true,
  })
  NOT?: PregnancyWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  earliestPossibleConception?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  latestPossibleConception?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  conception?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  dueDate?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  earliestPossibleBirth?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  latestPossibleBirth?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  parentId?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  pregnancySireId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitListRelationFilter, {
    nullable: true,
  })
  parents?: LivestockUnitListRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestListRelationFilter, {
    nullable: true,
  })
  pregnancyTest?: PregnancyTestListRelationFilter | undefined;
}

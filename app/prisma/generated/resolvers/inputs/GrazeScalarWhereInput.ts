import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { FloatNullableFilter } from "../inputs/FloatNullableFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("GrazeScalarWhereInput", {})
export class GrazeScalarWhereInput {
  @TypeGraphQL.Field((_type) => [GrazeScalarWhereInput], {
    nullable: true,
  })
  AND?: GrazeScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeScalarWhereInput], {
    nullable: true,
  })
  OR?: GrazeScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeScalarWhereInput], {
    nullable: true,
  })
  NOT?: GrazeScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  startDatetime?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  endDateTime?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  paddockId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  mobIds?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableFilter, {
    nullable: true,
  })
  dseDaysPerHectare?: FloatNullableFilter | undefined;
}

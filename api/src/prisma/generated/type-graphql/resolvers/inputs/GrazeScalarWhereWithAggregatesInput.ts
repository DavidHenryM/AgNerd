import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeNullableWithAggregatesFilter } from "../inputs/DateTimeNullableWithAggregatesFilter";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { FloatNullableWithAggregatesFilter } from "../inputs/FloatNullableWithAggregatesFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("GrazeScalarWhereWithAggregatesInput", {
  isAbstract: true,
})
export class GrazeScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [GrazeScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: GrazeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: GrazeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GrazeScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: GrazeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  startDatetime?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
  endDateTime?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  paddockId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  mobIds?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableWithAggregatesFilter, {
    nullable: true,
  })
  dseDaysPerHectare?: FloatNullableWithAggregatesFilter | undefined;
}

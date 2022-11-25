import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolWithAggregatesFilter } from "../inputs/BoolWithAggregatesFilter";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { EnumSexWithAggregatesFilter } from "../inputs/EnumSexWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("LivestockUnitScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class LivestockUnitScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [LivestockUnitScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: LivestockUnitScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: LivestockUnitScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: LivestockUnitScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  nlisid?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  name?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  comment?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumSexWithAggregatesFilter, {
    nullable: true
  })
  sex?: EnumSexWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  birthdate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => BoolWithAggregatesFilter, {
    nullable: true
  })
  desexed?: BoolWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  parentId?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  livestockUnitId?: StringWithAggregatesFilter | undefined;
}

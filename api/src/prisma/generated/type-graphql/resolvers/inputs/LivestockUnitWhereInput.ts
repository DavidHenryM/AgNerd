import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { BreedRelationFilter } from "../inputs/BreedRelationFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumSexFilter } from "../inputs/EnumSexFilter";
import { LivestockUnitRelationFilter } from "../inputs/LivestockUnitRelationFilter";
import { MobRelationFilter } from "../inputs/MobRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { WeightRecordListRelationFilter } from "../inputs/WeightRecordListRelationFilter";

@TypeGraphQL.InputType("LivestockUnitWhereInput", {
  isAbstract: true
})
export class LivestockUnitWhereInput {
  @TypeGraphQL.Field(_type => [LivestockUnitWhereInput], {
    nullable: true
  })
  AND?: LivestockUnitWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitWhereInput], {
    nullable: true
  })
  OR?: LivestockUnitWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitWhereInput], {
    nullable: true
  })
  NOT?: LivestockUnitWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  nlisid?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BreedRelationFilter, {
    nullable: true
  })
  breed?: BreedRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  comment?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => EnumSexFilter, {
    nullable: true
  })
  sex?: EnumSexFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  birthdate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => BoolFilter, {
    nullable: true
  })
  desexed?: BoolFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  parentId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitRelationFilter, {
    nullable: true
  })
  sire?: LivestockUnitRelationFilter | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitRelationFilter, {
    nullable: true
  })
  dam?: LivestockUnitRelationFilter | undefined;

  @TypeGraphQL.Field(_type => MobRelationFilter, {
    nullable: true
  })
  mob?: MobRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  livestockUnitId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => WeightRecordListRelationFilter, {
    nullable: true
  })
  weights?: WeightRecordListRelationFilter | undefined;
}

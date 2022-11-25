import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { MobListRelationFilter } from "../inputs/MobListRelationFilter";
import { PaddockRelationFilter } from "../inputs/PaddockRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("GrazeWhereInput", {
  isAbstract: true
})
export class GrazeWhereInput {
  @TypeGraphQL.Field(_type => [GrazeWhereInput], {
    nullable: true
  })
  AND?: GrazeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeWhereInput], {
    nullable: true
  })
  OR?: GrazeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeWhereInput], {
    nullable: true
  })
  NOT?: GrazeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  startDatetime?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  endDateTime?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => PaddockRelationFilter, {
    nullable: true
  })
  paddock?: PaddockRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  paddockId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  mobIds?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field(_type => MobListRelationFilter, {
    nullable: true
  })
  mob?: MobListRelationFilter | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumSexFilter } from "../inputs/EnumSexFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("LivestockUnitScalarWhereInput", {
  isAbstract: true
})
export class LivestockUnitScalarWhereInput {
  @TypeGraphQL.Field(_type => [LivestockUnitScalarWhereInput], {
    nullable: true
  })
  AND?: LivestockUnitScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitScalarWhereInput], {
    nullable: true
  })
  OR?: LivestockUnitScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitScalarWhereInput], {
    nullable: true
  })
  NOT?: LivestockUnitScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  nlisid?: StringNullableFilter | undefined;

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

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  livestockUnitId?: StringFilter | undefined;
}

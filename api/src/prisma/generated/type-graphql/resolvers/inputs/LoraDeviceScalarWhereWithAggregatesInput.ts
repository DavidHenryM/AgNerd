import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumLoraActivationMethodWithAggregatesFilter } from "../inputs/EnumLoraActivationMethodWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("LoraDeviceScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class LoraDeviceScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [LoraDeviceScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: LoraDeviceScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LoraDeviceScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: LoraDeviceScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [LoraDeviceScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: LoraDeviceScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  name?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  deviceId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  deviceEui?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  appEui?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  appKey?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  manufacturer?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  partNumber?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumLoraActivationMethodWithAggregatesFilter, {
    nullable: true
  })
  activationMethod?: EnumLoraActivationMethodWithAggregatesFilter | undefined;
}

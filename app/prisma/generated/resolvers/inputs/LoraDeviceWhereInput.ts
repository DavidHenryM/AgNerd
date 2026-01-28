import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumLoraActivationMethodFilter } from "../inputs/EnumLoraActivationMethodFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("LoraDeviceWhereInput", {})
export class LoraDeviceWhereInput {
  @TypeGraphQL.Field((_type) => [LoraDeviceWhereInput], {
    nullable: true,
  })
  AND?: LoraDeviceWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LoraDeviceWhereInput], {
    nullable: true,
  })
  OR?: LoraDeviceWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LoraDeviceWhereInput], {
    nullable: true,
  })
  NOT?: LoraDeviceWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  deviceId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  deviceEui?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  appEui?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  appKey?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  manufacturer?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  partNumber?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumLoraActivationMethodFilter, {
    nullable: true,
  })
  activationMethod?: EnumLoraActivationMethodFilter | undefined;
}

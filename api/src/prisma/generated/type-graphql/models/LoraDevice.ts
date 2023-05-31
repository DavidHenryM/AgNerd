import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { LoraActivationMethod } from "../enums/LoraActivationMethod";

@TypeGraphQL.ObjectType("LoraDevice", {
  isAbstract: true,
})
export class LoraDevice {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  deviceId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  deviceEui!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  appEui!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  appKey!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  manufacturer?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  partNumber?: string | null;

  @TypeGraphQL.Field((_type) => LoraActivationMethod, {
    nullable: false,
  })
  activationMethod!: "OTAA" | "ABP";
}

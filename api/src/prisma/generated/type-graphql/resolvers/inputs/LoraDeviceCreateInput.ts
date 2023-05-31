import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LoraActivationMethod } from "../../enums/LoraActivationMethod";

@TypeGraphQL.InputType("LoraDeviceCreateInput", {
  isAbstract: true,
})
export class LoraDeviceCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | undefined;

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
  manufacturer?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  partNumber?: string | undefined;

  @TypeGraphQL.Field((_type) => LoraActivationMethod, {
    nullable: true,
  })
  activationMethod?: "OTAA" | "ABP" | undefined;
}

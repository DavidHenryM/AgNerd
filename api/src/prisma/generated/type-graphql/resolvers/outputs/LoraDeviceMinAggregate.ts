import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LoraActivationMethod } from "../../enums/LoraActivationMethod";

@TypeGraphQL.ObjectType("LoraDeviceMinAggregate", {
  isAbstract: true,
})
export class LoraDeviceMinAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  deviceId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  deviceEui!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  appEui!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  appKey!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  manufacturer!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  partNumber!: string | null;

  @TypeGraphQL.Field((_type) => LoraActivationMethod, {
    nullable: true,
  })
  activationMethod!: "OTAA" | "ABP" | null;
}

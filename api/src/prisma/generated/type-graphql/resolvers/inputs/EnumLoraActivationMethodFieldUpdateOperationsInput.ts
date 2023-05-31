import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LoraActivationMethod } from "../../enums/LoraActivationMethod";

@TypeGraphQL.InputType("EnumLoraActivationMethodFieldUpdateOperationsInput", {
  isAbstract: true,
})
export class EnumLoraActivationMethodFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => LoraActivationMethod, {
    nullable: true,
  })
  set?: "OTAA" | "ABP" | undefined;
}

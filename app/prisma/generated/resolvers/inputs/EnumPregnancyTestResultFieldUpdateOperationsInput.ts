import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestResult } from "../../enums/PregnancyTestResult";

@TypeGraphQL.InputType("EnumPregnancyTestResultFieldUpdateOperationsInput", {})
export class EnumPregnancyTestResultFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => PregnancyTestResult, {
    nullable: true,
  })
  set?: "PREGNANT" | "NOT_PREGNANT" | "INCONCLUSIVE" | undefined;
}

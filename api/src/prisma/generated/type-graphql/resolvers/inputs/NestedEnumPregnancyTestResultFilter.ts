import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestResult } from "../../enums/PregnancyTestResult";

@TypeGraphQL.InputType("NestedEnumPregnancyTestResultFilter", {
  isAbstract: true,
})
export class NestedEnumPregnancyTestResultFilter {
  @TypeGraphQL.Field((_type) => PregnancyTestResult, {
    nullable: true,
  })
  equals?: "PREGNANT" | "NOT_PREGNANT" | "INCONCLUSIVE" | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestResult], {
    nullable: true,
  })
  in?: Array<"PREGNANT" | "NOT_PREGNANT" | "INCONCLUSIVE"> | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestResult], {
    nullable: true,
  })
  notIn?: Array<"PREGNANT" | "NOT_PREGNANT" | "INCONCLUSIVE"> | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumPregnancyTestResultFilter, {
    nullable: true,
  })
  not?: NestedEnumPregnancyTestResultFilter | undefined;
}

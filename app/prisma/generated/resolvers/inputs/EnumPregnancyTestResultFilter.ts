import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumPregnancyTestResultFilter } from "../inputs/NestedEnumPregnancyTestResultFilter";
import { PregnancyTestResult } from "../../enums/PregnancyTestResult";

@TypeGraphQL.InputType("EnumPregnancyTestResultFilter", {})
export class EnumPregnancyTestResultFilter {
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

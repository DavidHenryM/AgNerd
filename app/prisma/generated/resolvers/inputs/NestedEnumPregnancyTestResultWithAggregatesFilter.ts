import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumPregnancyTestResultFilter } from "../inputs/NestedEnumPregnancyTestResultFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { PregnancyTestResult } from "../../enums/PregnancyTestResult";

@TypeGraphQL.InputType("NestedEnumPregnancyTestResultWithAggregatesFilter", {})
export class NestedEnumPregnancyTestResultWithAggregatesFilter {
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

  @TypeGraphQL.Field(
    (_type) => NestedEnumPregnancyTestResultWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  not?: NestedEnumPregnancyTestResultWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumPregnancyTestResultFilter, {
    nullable: true,
  })
  _min?: NestedEnumPregnancyTestResultFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumPregnancyTestResultFilter, {
    nullable: true,
  })
  _max?: NestedEnumPregnancyTestResultFilter | undefined;
}

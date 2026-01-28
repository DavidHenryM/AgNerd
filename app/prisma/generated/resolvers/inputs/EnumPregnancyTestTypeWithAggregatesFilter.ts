import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumPregnancyTestTypeFilter } from "../inputs/NestedEnumPregnancyTestTypeFilter";
import { NestedEnumPregnancyTestTypeWithAggregatesFilter } from "../inputs/NestedEnumPregnancyTestTypeWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { PregnancyTestType } from "../../enums/PregnancyTestType";

@TypeGraphQL.InputType("EnumPregnancyTestTypeWithAggregatesFilter", {})
export class EnumPregnancyTestTypeWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => PregnancyTestType, {
    nullable: true,
  })
  equals?: "MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN" | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestType], {
    nullable: true,
  })
  in?:
    | Array<"MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN">
    | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestType], {
    nullable: true,
  })
  notIn?:
    | Array<"MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN">
    | undefined;

  @TypeGraphQL.Field(
    (_type) => NestedEnumPregnancyTestTypeWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  not?: NestedEnumPregnancyTestTypeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumPregnancyTestTypeFilter, {
    nullable: true,
  })
  _min?: NestedEnumPregnancyTestTypeFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumPregnancyTestTypeFilter, {
    nullable: true,
  })
  _max?: NestedEnumPregnancyTestTypeFilter | undefined;
}

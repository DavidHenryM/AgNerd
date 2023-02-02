import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumPregnancyTestTypeFilter } from "../inputs/NestedEnumPregnancyTestTypeFilter";
import { PregnancyTestType } from "../../enums/PregnancyTestType";

@TypeGraphQL.InputType("EnumPregnancyTestTypeFilter", {
  isAbstract: true
})
export class EnumPregnancyTestTypeFilter {
  @TypeGraphQL.Field(_type => PregnancyTestType, {
    nullable: true
  })
  equals?: "MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN" | undefined;

  @TypeGraphQL.Field(_type => [PregnancyTestType], {
    nullable: true
  })
  in?: Array<"MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN"> | undefined;

  @TypeGraphQL.Field(_type => [PregnancyTestType], {
    nullable: true
  })
  notIn?: Array<"MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumPregnancyTestTypeFilter, {
    nullable: true
  })
  not?: NestedEnumPregnancyTestTypeFilter | undefined;
}

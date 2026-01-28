import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestResult } from "../../enums/PregnancyTestResult";
import { PregnancyTestType } from "../../enums/PregnancyTestType";

@TypeGraphQL.ObjectType("PregnancyTestMaxAggregate", {})
export class PregnancyTestMaxAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  testDate!: Date | null;

  @TypeGraphQL.Field((_type) => PregnancyTestType, {
    nullable: true,
  })
  testType!: "MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN" | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  resultDate!: Date | null;

  @TypeGraphQL.Field((_type) => PregnancyTestResult, {
    nullable: true,
  })
  result!: "PREGNANT" | "NOT_PREGNANT" | "INCONCLUSIVE" | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  pregnancyId!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  cost!: number | null;
}

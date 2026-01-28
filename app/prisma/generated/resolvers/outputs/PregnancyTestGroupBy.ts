import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestAvgAggregate } from "../outputs/PregnancyTestAvgAggregate";
import { PregnancyTestCountAggregate } from "../outputs/PregnancyTestCountAggregate";
import { PregnancyTestMaxAggregate } from "../outputs/PregnancyTestMaxAggregate";
import { PregnancyTestMinAggregate } from "../outputs/PregnancyTestMinAggregate";
import { PregnancyTestSumAggregate } from "../outputs/PregnancyTestSumAggregate";
import { PregnancyTestResult } from "../../enums/PregnancyTestResult";
import { PregnancyTestType } from "../../enums/PregnancyTestType";

@TypeGraphQL.ObjectType("PregnancyTestGroupBy", {})
export class PregnancyTestGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  testDate!: Date;

  @TypeGraphQL.Field((_type) => PregnancyTestType, {
    nullable: false,
  })
  testType!: "MANUAL_RECTAL_PALPATATION" | "ULTRASOUND" | "BIOPRYN";

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  resultDate!: Date;

  @TypeGraphQL.Field((_type) => PregnancyTestResult, {
    nullable: false,
  })
  result!: "PREGNANT" | "NOT_PREGNANT" | "INCONCLUSIVE";

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  pregnancyId!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  cost!: number | null;

  @TypeGraphQL.Field((_type) => PregnancyTestCountAggregate, {
    nullable: true,
  })
  _count!: PregnancyTestCountAggregate | null;

  @TypeGraphQL.Field((_type) => PregnancyTestAvgAggregate, {
    nullable: true,
  })
  _avg!: PregnancyTestAvgAggregate | null;

  @TypeGraphQL.Field((_type) => PregnancyTestSumAggregate, {
    nullable: true,
  })
  _sum!: PregnancyTestSumAggregate | null;

  @TypeGraphQL.Field((_type) => PregnancyTestMinAggregate, {
    nullable: true,
  })
  _min!: PregnancyTestMinAggregate | null;

  @TypeGraphQL.Field((_type) => PregnancyTestMaxAggregate, {
    nullable: true,
  })
  _max!: PregnancyTestMaxAggregate | null;
}

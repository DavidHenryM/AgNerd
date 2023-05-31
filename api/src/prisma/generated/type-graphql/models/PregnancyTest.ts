import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Pregnancy } from "../models/Pregnancy";
import { PregnancyTestResult } from "../enums/PregnancyTestResult";
import { PregnancyTestType } from "../enums/PregnancyTestType";

@TypeGraphQL.ObjectType("PregnancyTest", {
  isAbstract: true,
})
export class PregnancyTest {
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

  pregnancy?: Pregnancy;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  cost?: number | null;
}

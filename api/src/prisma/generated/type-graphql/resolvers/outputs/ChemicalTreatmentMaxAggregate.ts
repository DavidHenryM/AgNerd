import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ApplicationMethod } from "../../enums/ApplicationMethod";

@TypeGraphQL.ObjectType("ChemicalTreatmentMaxAggregate", {
  isAbstract: true,
})
export class ChemicalTreatmentMaxAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  livestockUnitId!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  treatmentDate!: Date | null;

  @TypeGraphQL.Field((_type) => ApplicationMethod, {
    nullable: true,
  })
  applicationMethod!:
    | "ORAL"
    | "TRANSDERMAL"
    | "SUB_CUT_INJECTION"
    | "INTRAVENUS_INJECTION"
    | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  volume_ml!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  witholdingPeriodDays!: number | null;
}

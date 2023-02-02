import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentAvgAggregate } from "../outputs/ChemicalTreatmentAvgAggregate";
import { ChemicalTreatmentCountAggregate } from "../outputs/ChemicalTreatmentCountAggregate";
import { ChemicalTreatmentMaxAggregate } from "../outputs/ChemicalTreatmentMaxAggregate";
import { ChemicalTreatmentMinAggregate } from "../outputs/ChemicalTreatmentMinAggregate";
import { ChemicalTreatmentSumAggregate } from "../outputs/ChemicalTreatmentSumAggregate";
import { ApplicationMethod } from "../../enums/ApplicationMethod";

@TypeGraphQL.ObjectType("ChemicalTreatmentGroupBy", {
  isAbstract: true
})
export class ChemicalTreatmentGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  livestockUnitId!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  treatmentDate!: Date;

  @TypeGraphQL.Field(_type => ApplicationMethod, {
    nullable: false
  })
  applicationMethod!: "ORAL" | "TRANSDERMAL" | "SUB_CUT_INJECTION" | "INTRAVENUS_INJECTION";

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  volume_ml!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  witholdingPeriodDays!: number;

  @TypeGraphQL.Field(_type => ChemicalTreatmentCountAggregate, {
    nullable: true
  })
  _count!: ChemicalTreatmentCountAggregate | null;

  @TypeGraphQL.Field(_type => ChemicalTreatmentAvgAggregate, {
    nullable: true
  })
  _avg!: ChemicalTreatmentAvgAggregate | null;

  @TypeGraphQL.Field(_type => ChemicalTreatmentSumAggregate, {
    nullable: true
  })
  _sum!: ChemicalTreatmentSumAggregate | null;

  @TypeGraphQL.Field(_type => ChemicalTreatmentMinAggregate, {
    nullable: true
  })
  _min!: ChemicalTreatmentMinAggregate | null;

  @TypeGraphQL.Field(_type => ChemicalTreatmentMaxAggregate, {
    nullable: true
  })
  _max!: ChemicalTreatmentMaxAggregate | null;
}

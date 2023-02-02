import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentAvgAggregate } from "../outputs/ChemicalTreatmentAvgAggregate";
import { ChemicalTreatmentCountAggregate } from "../outputs/ChemicalTreatmentCountAggregate";
import { ChemicalTreatmentMaxAggregate } from "../outputs/ChemicalTreatmentMaxAggregate";
import { ChemicalTreatmentMinAggregate } from "../outputs/ChemicalTreatmentMinAggregate";
import { ChemicalTreatmentSumAggregate } from "../outputs/ChemicalTreatmentSumAggregate";

@TypeGraphQL.ObjectType("AggregateChemicalTreatment", {
  isAbstract: true
})
export class AggregateChemicalTreatment {
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

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductAvgAggregate } from "../outputs/ChemicalProductAvgAggregate";
import { ChemicalProductCountAggregate } from "../outputs/ChemicalProductCountAggregate";
import { ChemicalProductMaxAggregate } from "../outputs/ChemicalProductMaxAggregate";
import { ChemicalProductMinAggregate } from "../outputs/ChemicalProductMinAggregate";
import { ChemicalProductSumAggregate } from "../outputs/ChemicalProductSumAggregate";

@TypeGraphQL.ObjectType("AggregateChemicalProduct", {
  isAbstract: true
})
export class AggregateChemicalProduct {
  @TypeGraphQL.Field(_type => ChemicalProductCountAggregate, {
    nullable: true
  })
  _count!: ChemicalProductCountAggregate | null;

  @TypeGraphQL.Field(_type => ChemicalProductAvgAggregate, {
    nullable: true
  })
  _avg!: ChemicalProductAvgAggregate | null;

  @TypeGraphQL.Field(_type => ChemicalProductSumAggregate, {
    nullable: true
  })
  _sum!: ChemicalProductSumAggregate | null;

  @TypeGraphQL.Field(_type => ChemicalProductMinAggregate, {
    nullable: true
  })
  _min!: ChemicalProductMinAggregate | null;

  @TypeGraphQL.Field(_type => ChemicalProductMaxAggregate, {
    nullable: true
  })
  _max!: ChemicalProductMaxAggregate | null;
}

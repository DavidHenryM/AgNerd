import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultAvgAggregate } from "../outputs/EstimatedBreedingValueResultAvgAggregate";
import { EstimatedBreedingValueResultCountAggregate } from "../outputs/EstimatedBreedingValueResultCountAggregate";
import { EstimatedBreedingValueResultMaxAggregate } from "../outputs/EstimatedBreedingValueResultMaxAggregate";
import { EstimatedBreedingValueResultMinAggregate } from "../outputs/EstimatedBreedingValueResultMinAggregate";
import { EstimatedBreedingValueResultSumAggregate } from "../outputs/EstimatedBreedingValueResultSumAggregate";

@TypeGraphQL.ObjectType("AggregateEstimatedBreedingValueResult", {})
export class AggregateEstimatedBreedingValueResult {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultCountAggregate, {
    nullable: true,
  })
  _count!: EstimatedBreedingValueResultCountAggregate | null;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultAvgAggregate, {
    nullable: true,
  })
  _avg!: EstimatedBreedingValueResultAvgAggregate | null;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultSumAggregate, {
    nullable: true,
  })
  _sum!: EstimatedBreedingValueResultSumAggregate | null;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultMinAggregate, {
    nullable: true,
  })
  _min!: EstimatedBreedingValueResultMinAggregate | null;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultMaxAggregate, {
    nullable: true,
  })
  _max!: EstimatedBreedingValueResultMaxAggregate | null;
}

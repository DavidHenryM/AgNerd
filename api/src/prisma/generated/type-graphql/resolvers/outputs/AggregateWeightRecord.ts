import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordAvgAggregate } from "../outputs/WeightRecordAvgAggregate";
import { WeightRecordCountAggregate } from "../outputs/WeightRecordCountAggregate";
import { WeightRecordMaxAggregate } from "../outputs/WeightRecordMaxAggregate";
import { WeightRecordMinAggregate } from "../outputs/WeightRecordMinAggregate";
import { WeightRecordSumAggregate } from "../outputs/WeightRecordSumAggregate";

@TypeGraphQL.ObjectType("AggregateWeightRecord", {
  isAbstract: true,
})
export class AggregateWeightRecord {
  @TypeGraphQL.Field((_type) => WeightRecordCountAggregate, {
    nullable: true,
  })
  _count!: WeightRecordCountAggregate | null;

  @TypeGraphQL.Field((_type) => WeightRecordAvgAggregate, {
    nullable: true,
  })
  _avg!: WeightRecordAvgAggregate | null;

  @TypeGraphQL.Field((_type) => WeightRecordSumAggregate, {
    nullable: true,
  })
  _sum!: WeightRecordSumAggregate | null;

  @TypeGraphQL.Field((_type) => WeightRecordMinAggregate, {
    nullable: true,
  })
  _min!: WeightRecordMinAggregate | null;

  @TypeGraphQL.Field((_type) => WeightRecordMaxAggregate, {
    nullable: true,
  })
  _max!: WeightRecordMaxAggregate | null;
}

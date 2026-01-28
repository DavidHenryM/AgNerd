import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestAvgAggregate } from "../outputs/PregnancyTestAvgAggregate";
import { PregnancyTestCountAggregate } from "../outputs/PregnancyTestCountAggregate";
import { PregnancyTestMaxAggregate } from "../outputs/PregnancyTestMaxAggregate";
import { PregnancyTestMinAggregate } from "../outputs/PregnancyTestMinAggregate";
import { PregnancyTestSumAggregate } from "../outputs/PregnancyTestSumAggregate";

@TypeGraphQL.ObjectType("AggregatePregnancyTest", {})
export class AggregatePregnancyTest {
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

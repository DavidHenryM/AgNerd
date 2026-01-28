import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitAvgAggregate } from "../outputs/LivestockUnitAvgAggregate";
import { LivestockUnitCountAggregate } from "../outputs/LivestockUnitCountAggregate";
import { LivestockUnitMaxAggregate } from "../outputs/LivestockUnitMaxAggregate";
import { LivestockUnitMinAggregate } from "../outputs/LivestockUnitMinAggregate";
import { LivestockUnitSumAggregate } from "../outputs/LivestockUnitSumAggregate";

@TypeGraphQL.ObjectType("AggregateLivestockUnit", {})
export class AggregateLivestockUnit {
  @TypeGraphQL.Field((_type) => LivestockUnitCountAggregate, {
    nullable: true,
  })
  _count!: LivestockUnitCountAggregate | null;

  @TypeGraphQL.Field((_type) => LivestockUnitAvgAggregate, {
    nullable: true,
  })
  _avg!: LivestockUnitAvgAggregate | null;

  @TypeGraphQL.Field((_type) => LivestockUnitSumAggregate, {
    nullable: true,
  })
  _sum!: LivestockUnitSumAggregate | null;

  @TypeGraphQL.Field((_type) => LivestockUnitMinAggregate, {
    nullable: true,
  })
  _min!: LivestockUnitMinAggregate | null;

  @TypeGraphQL.Field((_type) => LivestockUnitMaxAggregate, {
    nullable: true,
  })
  _max!: LivestockUnitMaxAggregate | null;
}

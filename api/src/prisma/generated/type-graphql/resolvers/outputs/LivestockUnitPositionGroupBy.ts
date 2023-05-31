import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCountAggregate } from "../outputs/LivestockUnitPositionCountAggregate";
import { LivestockUnitPositionMaxAggregate } from "../outputs/LivestockUnitPositionMaxAggregate";
import { LivestockUnitPositionMinAggregate } from "../outputs/LivestockUnitPositionMinAggregate";

@TypeGraphQL.ObjectType("LivestockUnitPositionGroupBy", {
  isAbstract: true,
})
export class LivestockUnitPositionGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  date!: Date;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionCountAggregate, {
    nullable: true,
  })
  _count!: LivestockUnitPositionCountAggregate | null;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionMinAggregate, {
    nullable: true,
  })
  _min!: LivestockUnitPositionMinAggregate | null;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionMaxAggregate, {
    nullable: true,
  })
  _max!: LivestockUnitPositionMaxAggregate | null;
}

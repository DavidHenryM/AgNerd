import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockAvgAggregate } from "../outputs/PaddockAvgAggregate";
import { PaddockCountAggregate } from "../outputs/PaddockCountAggregate";
import { PaddockMaxAggregate } from "../outputs/PaddockMaxAggregate";
import { PaddockMinAggregate } from "../outputs/PaddockMinAggregate";
import { PaddockSumAggregate } from "../outputs/PaddockSumAggregate";

@TypeGraphQL.ObjectType("PaddockGroupBy", {
  isAbstract: true
})
export class PaddockGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  areaHa!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  livestockUnitPositionId!: string;

  @TypeGraphQL.Field(_type => PaddockCountAggregate, {
    nullable: true
  })
  _count!: PaddockCountAggregate | null;

  @TypeGraphQL.Field(_type => PaddockAvgAggregate, {
    nullable: true
  })
  _avg!: PaddockAvgAggregate | null;

  @TypeGraphQL.Field(_type => PaddockSumAggregate, {
    nullable: true
  })
  _sum!: PaddockSumAggregate | null;

  @TypeGraphQL.Field(_type => PaddockMinAggregate, {
    nullable: true
  })
  _min!: PaddockMinAggregate | null;

  @TypeGraphQL.Field(_type => PaddockMaxAggregate, {
    nullable: true
  })
  _max!: PaddockMaxAggregate | null;
}

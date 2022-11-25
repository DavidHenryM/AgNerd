import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointAvgAggregate } from "../outputs/GeoPointAvgAggregate";
import { GeoPointCountAggregate } from "../outputs/GeoPointCountAggregate";
import { GeoPointMaxAggregate } from "../outputs/GeoPointMaxAggregate";
import { GeoPointMinAggregate } from "../outputs/GeoPointMinAggregate";
import { GeoPointSumAggregate } from "../outputs/GeoPointSumAggregate";

@TypeGraphQL.ObjectType("AggregateGeoPoint", {
  isAbstract: true
})
export class AggregateGeoPoint {
  @TypeGraphQL.Field(_type => GeoPointCountAggregate, {
    nullable: true
  })
  _count!: GeoPointCountAggregate | null;

  @TypeGraphQL.Field(_type => GeoPointAvgAggregate, {
    nullable: true
  })
  _avg!: GeoPointAvgAggregate | null;

  @TypeGraphQL.Field(_type => GeoPointSumAggregate, {
    nullable: true
  })
  _sum!: GeoPointSumAggregate | null;

  @TypeGraphQL.Field(_type => GeoPointMinAggregate, {
    nullable: true
  })
  _min!: GeoPointMinAggregate | null;

  @TypeGraphQL.Field(_type => GeoPointMaxAggregate, {
    nullable: true
  })
  _max!: GeoPointMaxAggregate | null;
}

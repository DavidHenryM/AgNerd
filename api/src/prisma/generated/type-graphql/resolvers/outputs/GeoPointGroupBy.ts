import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointAvgAggregate } from "../outputs/GeoPointAvgAggregate";
import { GeoPointCountAggregate } from "../outputs/GeoPointCountAggregate";
import { GeoPointMaxAggregate } from "../outputs/GeoPointMaxAggregate";
import { GeoPointMinAggregate } from "../outputs/GeoPointMinAggregate";
import { GeoPointSumAggregate } from "../outputs/GeoPointSumAggregate";

@TypeGraphQL.ObjectType("GeoPointGroupBy", {
  isAbstract: true,
})
export class GeoPointGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  latitude!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  longitude!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  paddockId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitPositionId!: string;

  @TypeGraphQL.Field((_type) => GeoPointCountAggregate, {
    nullable: true,
  })
  _count!: GeoPointCountAggregate | null;

  @TypeGraphQL.Field((_type) => GeoPointAvgAggregate, {
    nullable: true,
  })
  _avg!: GeoPointAvgAggregate | null;

  @TypeGraphQL.Field((_type) => GeoPointSumAggregate, {
    nullable: true,
  })
  _sum!: GeoPointSumAggregate | null;

  @TypeGraphQL.Field((_type) => GeoPointMinAggregate, {
    nullable: true,
  })
  _min!: GeoPointMinAggregate | null;

  @TypeGraphQL.Field((_type) => GeoPointMaxAggregate, {
    nullable: true,
  })
  _max!: GeoPointMaxAggregate | null;
}

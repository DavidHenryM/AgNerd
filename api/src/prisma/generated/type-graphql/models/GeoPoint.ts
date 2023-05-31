import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { LivestockUnitPosition } from "../models/LivestockUnitPosition";
import { Paddock } from "../models/Paddock";

@TypeGraphQL.ObjectType("GeoPoint", {
  isAbstract: true,
})
export class GeoPoint {
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

  paddock?: Paddock;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  paddockId!: string;

  livestockUnitPosition?: LivestockUnitPosition;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitPositionId!: string;
}

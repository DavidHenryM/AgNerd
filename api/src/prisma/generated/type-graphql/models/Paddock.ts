import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { GeoPoint } from "../models/GeoPoint";
import { Graze } from "../models/Graze";
import { LivestockUnitPosition } from "../models/LivestockUnitPosition";
import { PaddockCount } from "../resolvers/outputs/PaddockCount";

@TypeGraphQL.ObjectType("Paddock", {
  isAbstract: true,
})
export class Paddock {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  polygon?: GeoPoint[];

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  areaHa!: number;

  graze?: Graze[];

  livestockUnitPosition?: LivestockUnitPosition;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitPositionId!: string;

  @TypeGraphQL.Field((_type) => PaddockCount, {
    nullable: true,
  })
  _count?: PaddockCount | null;
}

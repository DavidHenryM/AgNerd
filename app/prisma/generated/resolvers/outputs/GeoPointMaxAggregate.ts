import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("GeoPointMaxAggregate", {})
export class GeoPointMaxAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  latitude!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  longitude!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  paddockId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  livestockUnitPositionId!: string | null;
}

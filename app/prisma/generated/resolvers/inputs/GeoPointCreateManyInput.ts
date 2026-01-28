import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("GeoPointCreateManyInput", {})
export class GeoPointCreateManyInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

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
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCountGrazeArgs } from "./args/PaddockCountGrazeArgs";
import { PaddockCountPolygonArgs } from "./args/PaddockCountPolygonArgs";

@TypeGraphQL.ObjectType("PaddockCount", {})
export class PaddockCount {
  polygon!: number;
  graze!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "polygon",
    nullable: false,
  })
  getPolygon(
    @TypeGraphQL.Root() root: PaddockCount,
    @TypeGraphQL.Args() args: PaddockCountPolygonArgs,
  ): number {
    return root.polygon;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "graze",
    nullable: false,
  })
  getGraze(
    @TypeGraphQL.Root() root: PaddockCount,
    @TypeGraphQL.Args() args: PaddockCountGrazeArgs,
  ): number {
    return root.graze;
  }
}

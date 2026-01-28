import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCountMobArgs } from "./args/GrazeCountMobArgs";

@TypeGraphQL.ObjectType("GrazeCount", {})
export class GrazeCount {
  mob!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "mob",
    nullable: false,
  })
  getMob(
    @TypeGraphQL.Root() root: GrazeCount,
    @TypeGraphQL.Args() args: GrazeCountMobArgs,
  ): number {
    return root.mob;
  }
}

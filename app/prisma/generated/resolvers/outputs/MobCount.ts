import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCountGrazeArgs } from "./args/MobCountGrazeArgs";
import { MobCountMembersArgs } from "./args/MobCountMembersArgs";

@TypeGraphQL.ObjectType("MobCount", {})
export class MobCount {
  members!: number;
  graze!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "members",
    nullable: false,
  })
  getMembers(
    @TypeGraphQL.Root() root: MobCount,
    @TypeGraphQL.Args() args: MobCountMembersArgs,
  ): number {
    return root.members;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "graze",
    nullable: false,
  })
  getGraze(
    @TypeGraphQL.Root() root: MobCount,
    @TypeGraphQL.Args() args: MobCountGrazeArgs,
  ): number {
    return root.graze;
  }
}

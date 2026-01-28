import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCountUsersArgs } from "./args/FarmCountUsersArgs";

@TypeGraphQL.ObjectType("FarmCount", {})
export class FarmCount {
  users!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "users",
    nullable: false,
  })
  getUsers(
    @TypeGraphQL.Root() root: FarmCount,
    @TypeGraphQL.Args() args: FarmCountUsersArgs,
  ): number {
    return root.users;
  }
}

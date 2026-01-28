import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCountParentsArgs } from "./args/PregnancyCountParentsArgs";
import { PregnancyCountPregnancyTestArgs } from "./args/PregnancyCountPregnancyTestArgs";

@TypeGraphQL.ObjectType("PregnancyCount", {})
export class PregnancyCount {
  parents!: number;
  pregnancyTest!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "parents",
    nullable: false,
  })
  getParents(
    @TypeGraphQL.Root() root: PregnancyCount,
    @TypeGraphQL.Args() args: PregnancyCountParentsArgs,
  ): number {
    return root.parents;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "pregnancyTest",
    nullable: false,
  })
  getPregnancyTest(
    @TypeGraphQL.Root() root: PregnancyCount,
    @TypeGraphQL.Args() args: PregnancyCountPregnancyTestArgs,
  ): number {
    return root.pregnancyTest;
  }
}

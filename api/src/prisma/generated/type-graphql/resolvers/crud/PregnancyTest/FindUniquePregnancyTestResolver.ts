import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniquePregnancyTestArgs } from "./args/FindUniquePregnancyTestArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => PregnancyTest)
export class FindUniquePregnancyTestResolver {
  @TypeGraphQL.Query((_returns) => PregnancyTest, {
    nullable: true,
  })
  async pregnancyTest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniquePregnancyTestArgs
  ): Promise<PregnancyTest | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).pregnancyTest.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniquePregnancyTestOrThrowArgs } from "./args/FindUniquePregnancyTestOrThrowArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => PregnancyTest)
export class FindUniquePregnancyTestOrThrowResolver {
  @TypeGraphQL.Query((_returns) => PregnancyTest, {
    nullable: true,
  })
  async getPregnancyTest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniquePregnancyTestOrThrowArgs,
  ): Promise<PregnancyTest | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).pregnancyTest.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

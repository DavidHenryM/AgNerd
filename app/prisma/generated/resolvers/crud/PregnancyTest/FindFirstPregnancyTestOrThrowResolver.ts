import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstPregnancyTestOrThrowArgs } from "./args/FindFirstPregnancyTestOrThrowArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => PregnancyTest)
export class FindFirstPregnancyTestOrThrowResolver {
  @TypeGraphQL.Query((_returns) => PregnancyTest, {
    nullable: true,
  })
  async findFirstPregnancyTestOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstPregnancyTestOrThrowArgs,
  ): Promise<PregnancyTest | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).pregnancyTest.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

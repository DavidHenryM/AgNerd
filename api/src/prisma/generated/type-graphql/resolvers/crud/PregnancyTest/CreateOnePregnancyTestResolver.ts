import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateOnePregnancyTestArgs } from "./args/CreateOnePregnancyTestArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => PregnancyTest)
export class CreateOnePregnancyTestResolver {
  @TypeGraphQL.Mutation((_returns) => PregnancyTest, {
    nullable: false,
  })
  async createOnePregnancyTest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOnePregnancyTestArgs
  ): Promise<PregnancyTest> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).pregnancyTest.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

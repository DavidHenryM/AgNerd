import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteOnePregnancyTestArgs } from "./args/DeleteOnePregnancyTestArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => PregnancyTest)
export class DeleteOnePregnancyTestResolver {
  @TypeGraphQL.Mutation((_returns) => PregnancyTest, {
    nullable: true,
  })
  async deleteOnePregnancyTest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOnePregnancyTestArgs,
  ): Promise<PregnancyTest | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).pregnancyTest.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

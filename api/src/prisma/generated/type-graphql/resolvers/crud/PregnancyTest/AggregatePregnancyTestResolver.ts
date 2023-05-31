import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregatePregnancyTestArgs } from "./args/AggregatePregnancyTestArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { AggregatePregnancyTest } from "../../outputs/AggregatePregnancyTest";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => PregnancyTest)
export class AggregatePregnancyTestResolver {
  @TypeGraphQL.Query((_returns) => AggregatePregnancyTest, {
    nullable: false,
  })
  async aggregatePregnancyTest(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregatePregnancyTestArgs
  ): Promise<AggregatePregnancyTest> {
    return getPrismaFromContext(ctx).pregnancyTest.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

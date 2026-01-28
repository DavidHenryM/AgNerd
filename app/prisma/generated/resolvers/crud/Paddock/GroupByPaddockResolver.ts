import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByPaddockArgs } from "./args/GroupByPaddockArgs";
import { Paddock } from "../../../models/Paddock";
import { PaddockGroupBy } from "../../outputs/PaddockGroupBy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Paddock)
export class GroupByPaddockResolver {
  @TypeGraphQL.Query((_returns) => [PaddockGroupBy], {
    nullable: false,
  })
  async groupByPaddock(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByPaddockArgs,
  ): Promise<PaddockGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).paddock.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}

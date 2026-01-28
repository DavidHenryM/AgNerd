import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByLivestockUnitPositionArgs } from "./args/GroupByLivestockUnitPositionArgs";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import { LivestockUnitPositionGroupBy } from "../../outputs/LivestockUnitPositionGroupBy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnitPosition)
export class GroupByLivestockUnitPositionResolver {
  @TypeGraphQL.Query((_returns) => [LivestockUnitPositionGroupBy], {
    nullable: false,
  })
  async groupByLivestockUnitPosition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByLivestockUnitPositionArgs,
  ): Promise<LivestockUnitPositionGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnitPosition.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}

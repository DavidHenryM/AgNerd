import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByLivestockUnitArgs } from "./args/GroupByLivestockUnitArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { LivestockUnitGroupBy } from "../../outputs/LivestockUnitGroupBy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnit)
export class GroupByLivestockUnitResolver {
  @TypeGraphQL.Query((_returns) => [LivestockUnitGroupBy], {
    nullable: false,
  })
  async groupByLivestockUnit(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByLivestockUnitArgs
  ): Promise<LivestockUnitGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnit.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null
        )
      ),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByGeoPointArgs } from "./args/GroupByGeoPointArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import { GeoPointGroupBy } from "../../outputs/GeoPointGroupBy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => GeoPoint)
export class GroupByGeoPointResolver {
  @TypeGraphQL.Query((_returns) => [GeoPointGroupBy], {
    nullable: false,
  })
  async groupByGeoPoint(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByGeoPointArgs
  ): Promise<GeoPointGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).geoPoint.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null
        )
      ),
    });
  }
}

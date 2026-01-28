import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueGeoPointArgs } from "./args/FindUniqueGeoPointArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => GeoPoint)
export class FindUniqueGeoPointResolver {
  @TypeGraphQL.Query((_returns) => GeoPoint, {
    nullable: true,
  })
  async geoPoint(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueGeoPointArgs,
  ): Promise<GeoPoint | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).geoPoint.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

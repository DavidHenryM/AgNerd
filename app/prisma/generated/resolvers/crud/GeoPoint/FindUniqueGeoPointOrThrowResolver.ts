import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueGeoPointOrThrowArgs } from "./args/FindUniqueGeoPointOrThrowArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => GeoPoint)
export class FindUniqueGeoPointOrThrowResolver {
  @TypeGraphQL.Query((_returns) => GeoPoint, {
    nullable: true,
  })
  async getGeoPoint(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueGeoPointOrThrowArgs,
  ): Promise<GeoPoint | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).geoPoint.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

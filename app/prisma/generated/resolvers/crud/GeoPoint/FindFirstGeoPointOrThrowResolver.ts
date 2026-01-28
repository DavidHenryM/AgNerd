import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstGeoPointOrThrowArgs } from "./args/FindFirstGeoPointOrThrowArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => GeoPoint)
export class FindFirstGeoPointOrThrowResolver {
  @TypeGraphQL.Query((_returns) => GeoPoint, {
    nullable: true,
  })
  async findFirstGeoPointOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstGeoPointOrThrowArgs,
  ): Promise<GeoPoint | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).geoPoint.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

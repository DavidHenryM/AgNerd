import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateGeoPointArgs } from "./args/AggregateGeoPointArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import { AggregateGeoPoint } from "../../outputs/AggregateGeoPoint";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => GeoPoint)
export class AggregateGeoPointResolver {
  @TypeGraphQL.Query((_returns) => AggregateGeoPoint, {
    nullable: false,
  })
  async aggregateGeoPoint(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateGeoPointArgs,
  ): Promise<AggregateGeoPoint> {
    return getPrismaFromContext(ctx).geoPoint.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

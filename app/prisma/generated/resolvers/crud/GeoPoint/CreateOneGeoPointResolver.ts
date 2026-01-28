import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateOneGeoPointArgs } from "./args/CreateOneGeoPointArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => GeoPoint)
export class CreateOneGeoPointResolver {
  @TypeGraphQL.Mutation((_returns) => GeoPoint, {
    nullable: false,
  })
  async createOneGeoPoint(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneGeoPointArgs,
  ): Promise<GeoPoint> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).geoPoint.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

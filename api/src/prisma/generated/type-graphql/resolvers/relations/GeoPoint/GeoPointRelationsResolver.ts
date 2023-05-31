import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GeoPoint } from "../../../models/GeoPoint";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import { Paddock } from "../../../models/Paddock";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => GeoPoint)
export class GeoPointRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Paddock, {
    nullable: false,
  })
  async paddock(
    @TypeGraphQL.Root() geoPoint: GeoPoint,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<Paddock> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .geoPoint.findUniqueOrThrow({
        where: {
          id: geoPoint.id,
        },
      })
      .paddock({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => LivestockUnitPosition, {
    nullable: false,
  })
  async livestockUnitPosition(
    @TypeGraphQL.Root() geoPoint: GeoPoint,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<LivestockUnitPosition> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .geoPoint.findUniqueOrThrow({
        where: {
          id: geoPoint.id,
        },
      })
      .livestockUnitPosition({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

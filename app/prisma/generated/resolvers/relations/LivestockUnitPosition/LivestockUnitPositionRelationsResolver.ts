import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GeoPoint } from "../../../models/GeoPoint";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import { Paddock } from "../../../models/Paddock";
import { LivestockUnitPositionLocationArgs } from "./args/LivestockUnitPositionLocationArgs";
import { LivestockUnitPositionPaddockArgs } from "./args/LivestockUnitPositionPaddockArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnitPosition)
export class LivestockUnitPositionRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => GeoPoint, {
    nullable: true,
  })
  async location(
    @TypeGraphQL.Root() livestockUnitPosition: LivestockUnitPosition,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitPositionLocationArgs,
  ): Promise<GeoPoint | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnitPosition.findUniqueOrThrow({
        where: {
          id: livestockUnitPosition.id,
        },
      })
      .location({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => Paddock, {
    nullable: true,
  })
  async paddock(
    @TypeGraphQL.Root() livestockUnitPosition: LivestockUnitPosition,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitPositionPaddockArgs,
  ): Promise<Paddock | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnitPosition.findUniqueOrThrow({
        where: {
          id: livestockUnitPosition.id,
        },
      })
      .paddock({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

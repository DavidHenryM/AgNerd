import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GeoPoint } from "../../../models/GeoPoint";
import { Graze } from "../../../models/Graze";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import { Paddock } from "../../../models/Paddock";
import { PaddockGrazeArgs } from "./args/PaddockGrazeArgs";
import { PaddockPolygonArgs } from "./args/PaddockPolygonArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Paddock)
export class PaddockRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [GeoPoint], {
    nullable: false,
  })
  async polygon(
    @TypeGraphQL.Root() paddock: Paddock,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: PaddockPolygonArgs
  ): Promise<GeoPoint[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .paddock.findUniqueOrThrow({
        where: {
          id: paddock.id,
        },
      })
      .polygon({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [Graze], {
    nullable: false,
  })
  async graze(
    @TypeGraphQL.Root() paddock: Paddock,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: PaddockGrazeArgs
  ): Promise<Graze[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .paddock.findUniqueOrThrow({
        where: {
          id: paddock.id,
        },
      })
      .graze({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => LivestockUnitPosition, {
    nullable: false,
  })
  async livestockUnitPosition(
    @TypeGraphQL.Root() paddock: Paddock,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<LivestockUnitPosition> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .paddock.findUniqueOrThrow({
        where: {
          id: paddock.id,
        },
      })
      .livestockUnitPosition({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

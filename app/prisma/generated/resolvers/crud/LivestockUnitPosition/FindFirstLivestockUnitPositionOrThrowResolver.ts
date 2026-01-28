import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstLivestockUnitPositionOrThrowArgs } from "./args/FindFirstLivestockUnitPositionOrThrowArgs";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnitPosition)
export class FindFirstLivestockUnitPositionOrThrowResolver {
  @TypeGraphQL.Query((_returns) => LivestockUnitPosition, {
    nullable: true,
  })
  async findFirstLivestockUnitPositionOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstLivestockUnitPositionOrThrowArgs,
  ): Promise<LivestockUnitPosition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnitPosition.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

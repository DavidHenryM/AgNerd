import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstLivestockUnitPositionArgs } from "./args/FindFirstLivestockUnitPositionArgs";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnitPosition)
export class FindFirstLivestockUnitPositionResolver {
  @TypeGraphQL.Query((_returns) => LivestockUnitPosition, {
    nullable: true,
  })
  async findFirstLivestockUnitPosition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstLivestockUnitPositionArgs,
  ): Promise<LivestockUnitPosition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnitPosition.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

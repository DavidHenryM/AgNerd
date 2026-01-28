import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateOneLivestockUnitPositionArgs } from "./args/UpdateOneLivestockUnitPositionArgs";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnitPosition)
export class UpdateOneLivestockUnitPositionResolver {
  @TypeGraphQL.Mutation((_returns) => LivestockUnitPosition, {
    nullable: true,
  })
  async updateOneLivestockUnitPosition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneLivestockUnitPositionArgs,
  ): Promise<LivestockUnitPosition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnitPosition.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

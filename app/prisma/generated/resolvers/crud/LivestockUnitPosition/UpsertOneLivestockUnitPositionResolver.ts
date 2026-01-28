import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneLivestockUnitPositionArgs } from "./args/UpsertOneLivestockUnitPositionArgs";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnitPosition)
export class UpsertOneLivestockUnitPositionResolver {
  @TypeGraphQL.Mutation((_returns) => LivestockUnitPosition, {
    nullable: false,
  })
  async upsertOneLivestockUnitPosition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneLivestockUnitPositionArgs,
  ): Promise<LivestockUnitPosition> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnitPosition.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

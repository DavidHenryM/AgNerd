import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateLivestockUnitPositionArgs } from "./args/AggregateLivestockUnitPositionArgs";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import { AggregateLivestockUnitPosition } from "../../outputs/AggregateLivestockUnitPosition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnitPosition)
export class AggregateLivestockUnitPositionResolver {
  @TypeGraphQL.Query((_returns) => AggregateLivestockUnitPosition, {
    nullable: false,
  })
  async aggregateLivestockUnitPosition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateLivestockUnitPositionArgs,
  ): Promise<AggregateLivestockUnitPosition> {
    return getPrismaFromContext(ctx).livestockUnitPosition.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

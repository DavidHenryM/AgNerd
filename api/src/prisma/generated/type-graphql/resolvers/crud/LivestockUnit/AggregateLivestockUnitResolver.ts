import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateLivestockUnitArgs } from "./args/AggregateLivestockUnitArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { AggregateLivestockUnit } from "../../outputs/AggregateLivestockUnit";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnit)
export class AggregateLivestockUnitResolver {
  @TypeGraphQL.Query((_returns) => AggregateLivestockUnit, {
    nullable: false,
  })
  async aggregateLivestockUnit(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateLivestockUnitArgs
  ): Promise<AggregateLivestockUnit> {
    return getPrismaFromContext(ctx).livestockUnit.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

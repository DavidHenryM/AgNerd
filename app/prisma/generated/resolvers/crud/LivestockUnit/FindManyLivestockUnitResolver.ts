import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindManyLivestockUnitArgs } from "./args/FindManyLivestockUnitArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnit)
export class FindManyLivestockUnitResolver {
  @TypeGraphQL.Query((_returns) => [LivestockUnit], {
    nullable: false,
  })
  async livestockUnits(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyLivestockUnitArgs,
  ): Promise<LivestockUnit[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnit.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneLivestockUnitArgs } from "./args/UpsertOneLivestockUnitArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnit)
export class UpsertOneLivestockUnitResolver {
  @TypeGraphQL.Mutation((_returns) => LivestockUnit, {
    nullable: false,
  })
  async upsertOneLivestockUnit(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneLivestockUnitArgs,
  ): Promise<LivestockUnit> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnit.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

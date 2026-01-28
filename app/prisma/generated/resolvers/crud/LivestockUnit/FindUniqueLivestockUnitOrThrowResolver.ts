import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueLivestockUnitOrThrowArgs } from "./args/FindUniqueLivestockUnitOrThrowArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnit)
export class FindUniqueLivestockUnitOrThrowResolver {
  @TypeGraphQL.Query((_returns) => LivestockUnit, {
    nullable: true,
  })
  async getLivestockUnit(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueLivestockUnitOrThrowArgs,
  ): Promise<LivestockUnit | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnit.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstLivestockUnitOrThrowArgs } from "./args/FindFirstLivestockUnitOrThrowArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnit)
export class FindFirstLivestockUnitOrThrowResolver {
  @TypeGraphQL.Query((_returns) => LivestockUnit, {
    nullable: true,
  })
  async findFirstLivestockUnitOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstLivestockUnitOrThrowArgs,
  ): Promise<LivestockUnit | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).livestockUnit.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

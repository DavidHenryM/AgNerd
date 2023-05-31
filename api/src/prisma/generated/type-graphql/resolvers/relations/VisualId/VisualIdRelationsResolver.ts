import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { VisualId } from "../../../models/VisualId";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => VisualId)
export class VisualIdRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: false,
  })
  async livestockUnit(
    @TypeGraphQL.Root() visualId: VisualId,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<LivestockUnit> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .visualId.findUniqueOrThrow({
        where: {
          id: visualId.id,
        },
      })
      .livestockUnit({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

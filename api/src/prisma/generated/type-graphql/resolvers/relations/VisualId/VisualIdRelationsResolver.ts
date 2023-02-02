import * as TypeGraphQL from "type-graphql";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { VisualId } from "../../../models/VisualId";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => VisualId)
export class VisualIdRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => LivestockUnit, {
    nullable: false
  })
  async livestockUnit(@TypeGraphQL.Root() visualId: VisualId, @TypeGraphQL.Ctx() ctx: any): Promise<LivestockUnit> {
    return getPrismaFromContext(ctx).visualId.findUnique({
      where: {
        id: visualId.id,
      },
    }).livestockUnit({});
  }
}

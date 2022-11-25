import * as TypeGraphQL from "type-graphql";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { WeightRecord } from "../../../models/WeightRecord";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => WeightRecord)
export class WeightRecordRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => LivestockUnit, {
    nullable: false
  })
  async livestockUnit(@TypeGraphQL.Root() weightRecord: WeightRecord, @TypeGraphQL.Ctx() ctx: any): Promise<LivestockUnit> {
    return getPrismaFromContext(ctx).weightRecord.findUnique({
      where: {
        id: weightRecord.id,
      },
    }).livestockUnit({});
  }
}

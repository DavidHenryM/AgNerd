import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { WeightRecord } from "../../../models/WeightRecord";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => WeightRecord)
export class WeightRecordRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: false,
  })
  async livestockUnit(
    @TypeGraphQL.Root() weightRecord: WeightRecord,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<LivestockUnit> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .weightRecord.findUniqueOrThrow({
        where: {
          id: weightRecord.id,
        },
      })
      .livestockUnit({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

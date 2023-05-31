import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateWeightRecordArgs } from "./args/AggregateWeightRecordArgs";
import { WeightRecord } from "../../../models/WeightRecord";
import { AggregateWeightRecord } from "../../outputs/AggregateWeightRecord";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => WeightRecord)
export class AggregateWeightRecordResolver {
  @TypeGraphQL.Query((_returns) => AggregateWeightRecord, {
    nullable: false,
  })
  async aggregateWeightRecord(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateWeightRecordArgs
  ): Promise<AggregateWeightRecord> {
    return getPrismaFromContext(ctx).weightRecord.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

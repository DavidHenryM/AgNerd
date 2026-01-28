import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueWeightRecordOrThrowArgs } from "./args/FindUniqueWeightRecordOrThrowArgs";
import { WeightRecord } from "../../../models/WeightRecord";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => WeightRecord)
export class FindUniqueWeightRecordOrThrowResolver {
  @TypeGraphQL.Query((_returns) => WeightRecord, {
    nullable: true,
  })
  async getWeightRecord(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueWeightRecordOrThrowArgs,
  ): Promise<WeightRecord | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).weightRecord.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

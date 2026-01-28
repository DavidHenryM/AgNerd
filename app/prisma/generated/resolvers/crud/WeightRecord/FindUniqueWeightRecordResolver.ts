import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueWeightRecordArgs } from "./args/FindUniqueWeightRecordArgs";
import { WeightRecord } from "../../../models/WeightRecord";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => WeightRecord)
export class FindUniqueWeightRecordResolver {
  @TypeGraphQL.Query((_returns) => WeightRecord, {
    nullable: true,
  })
  async weightRecord(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueWeightRecordArgs,
  ): Promise<WeightRecord | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).weightRecord.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

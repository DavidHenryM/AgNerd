import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindManyWeightRecordArgs } from "./args/FindManyWeightRecordArgs";
import { WeightRecord } from "../../../models/WeightRecord";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => WeightRecord)
export class FindManyWeightRecordResolver {
  @TypeGraphQL.Query((_returns) => [WeightRecord], {
    nullable: false,
  })
  async weightRecords(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyWeightRecordArgs,
  ): Promise<WeightRecord[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).weightRecord.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

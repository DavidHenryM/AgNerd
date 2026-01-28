import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteOneWeightRecordArgs } from "./args/DeleteOneWeightRecordArgs";
import { WeightRecord } from "../../../models/WeightRecord";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => WeightRecord)
export class DeleteOneWeightRecordResolver {
  @TypeGraphQL.Mutation((_returns) => WeightRecord, {
    nullable: true,
  })
  async deleteOneWeightRecord(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneWeightRecordArgs,
  ): Promise<WeightRecord | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).weightRecord.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpsertOneWeightRecordArgs } from "./args/UpsertOneWeightRecordArgs";
import { WeightRecord } from "../../../models/WeightRecord";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => WeightRecord)
export class UpsertOneWeightRecordResolver {
  @TypeGraphQL.Mutation(_returns => WeightRecord, {
    nullable: false
  })
  async upsertOneWeightRecord(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOneWeightRecordArgs): Promise<WeightRecord> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).weightRecord.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

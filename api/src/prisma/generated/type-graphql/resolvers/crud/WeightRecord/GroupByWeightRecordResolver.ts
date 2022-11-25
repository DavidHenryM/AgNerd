import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { GroupByWeightRecordArgs } from "./args/GroupByWeightRecordArgs";
import { WeightRecord } from "../../../models/WeightRecord";
import { WeightRecordGroupBy } from "../../outputs/WeightRecordGroupBy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => WeightRecord)
export class GroupByWeightRecordResolver {
  @TypeGraphQL.Query(_returns => [WeightRecordGroupBy], {
    nullable: false
  })
  async groupByWeightRecord(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByWeightRecordArgs): Promise<WeightRecordGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).weightRecord.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}

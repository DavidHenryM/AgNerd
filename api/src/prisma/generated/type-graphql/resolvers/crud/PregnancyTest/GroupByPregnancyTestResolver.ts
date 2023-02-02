import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { GroupByPregnancyTestArgs } from "./args/GroupByPregnancyTestArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { PregnancyTestGroupBy } from "../../outputs/PregnancyTestGroupBy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => PregnancyTest)
export class GroupByPregnancyTestResolver {
  @TypeGraphQL.Query(_returns => [PregnancyTestGroupBy], {
    nullable: false
  })
  async groupByPregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByPregnancyTestArgs): Promise<PregnancyTestGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}

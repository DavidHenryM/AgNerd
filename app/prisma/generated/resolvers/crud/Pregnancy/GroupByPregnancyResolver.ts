import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByPregnancyArgs } from "./args/GroupByPregnancyArgs";
import { Pregnancy } from "../../../models/Pregnancy";
import { PregnancyGroupBy } from "../../outputs/PregnancyGroupBy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Pregnancy)
export class GroupByPregnancyResolver {
  @TypeGraphQL.Query((_returns) => [PregnancyGroupBy], {
    nullable: false,
  })
  async groupByPregnancy(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByPregnancyArgs,
  ): Promise<PregnancyGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).pregnancy.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}

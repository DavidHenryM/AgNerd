import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByActiveIngredientArgs } from "./args/GroupByActiveIngredientArgs";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import { ActiveIngredientGroupBy } from "../../outputs/ActiveIngredientGroupBy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ActiveIngredient)
export class GroupByActiveIngredientResolver {
  @TypeGraphQL.Query((_returns) => [ActiveIngredientGroupBy], {
    nullable: false,
  })
  async groupByActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByActiveIngredientArgs,
  ): Promise<ActiveIngredientGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindManyActiveIngredientArgs } from "./args/FindManyActiveIngredientArgs";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ActiveIngredient)
export class FindManyActiveIngredientResolver {
  @TypeGraphQL.Query((_returns) => [ActiveIngredient], {
    nullable: false,
  })
  async activeIngredients(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyActiveIngredientArgs,
  ): Promise<ActiveIngredient[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

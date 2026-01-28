import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueActiveIngredientOrThrowArgs } from "./args/FindUniqueActiveIngredientOrThrowArgs";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ActiveIngredient)
export class FindUniqueActiveIngredientOrThrowResolver {
  @TypeGraphQL.Query((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async getActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueActiveIngredientOrThrowArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

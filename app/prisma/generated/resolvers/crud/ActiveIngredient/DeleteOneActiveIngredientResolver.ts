import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteOneActiveIngredientArgs } from "./args/DeleteOneActiveIngredientArgs";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ActiveIngredient)
export class DeleteOneActiveIngredientResolver {
  @TypeGraphQL.Mutation((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async deleteOneActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneActiveIngredientArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

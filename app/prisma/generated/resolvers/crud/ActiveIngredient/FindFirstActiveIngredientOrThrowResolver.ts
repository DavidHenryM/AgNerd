import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstActiveIngredientOrThrowArgs } from "./args/FindFirstActiveIngredientOrThrowArgs";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ActiveIngredient)
export class FindFirstActiveIngredientOrThrowResolver {
  @TypeGraphQL.Query((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async findFirstActiveIngredientOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstActiveIngredientOrThrowArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

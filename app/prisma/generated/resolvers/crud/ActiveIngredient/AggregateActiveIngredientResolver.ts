import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateActiveIngredientArgs } from "./args/AggregateActiveIngredientArgs";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import { AggregateActiveIngredient } from "../../outputs/AggregateActiveIngredient";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ActiveIngredient)
export class AggregateActiveIngredientResolver {
  @TypeGraphQL.Query((_returns) => AggregateActiveIngredient, {
    nullable: false,
  })
  async aggregateActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateActiveIngredientArgs,
  ): Promise<AggregateActiveIngredient> {
    return getPrismaFromContext(ctx).activeIngredient.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

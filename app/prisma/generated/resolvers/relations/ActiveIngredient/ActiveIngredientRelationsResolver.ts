import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ActiveIngredient)
export class ActiveIngredientRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => ChemicalProduct, {
    nullable: false,
  })
  async product(
    @TypeGraphQL.Root() activeIngredient: ActiveIngredient,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<ChemicalProduct> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .activeIngredient.findUniqueOrThrow({
        where: {
          id: activeIngredient.id,
        },
      })
      .product({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

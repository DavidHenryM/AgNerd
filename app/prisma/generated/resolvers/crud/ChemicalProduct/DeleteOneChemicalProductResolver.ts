import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteOneChemicalProductArgs } from "./args/DeleteOneChemicalProductArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalProduct)
export class DeleteOneChemicalProductResolver {
  @TypeGraphQL.Mutation((_returns) => ChemicalProduct, {
    nullable: true,
  })
  async deleteOneChemicalProduct(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneChemicalProductArgs,
  ): Promise<ChemicalProduct | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).chemicalProduct.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

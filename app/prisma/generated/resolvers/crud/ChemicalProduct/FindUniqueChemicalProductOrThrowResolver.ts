import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueChemicalProductOrThrowArgs } from "./args/FindUniqueChemicalProductOrThrowArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalProduct)
export class FindUniqueChemicalProductOrThrowResolver {
  @TypeGraphQL.Query((_returns) => ChemicalProduct, {
    nullable: true,
  })
  async getChemicalProduct(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueChemicalProductOrThrowArgs,
  ): Promise<ChemicalProduct | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).chemicalProduct.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

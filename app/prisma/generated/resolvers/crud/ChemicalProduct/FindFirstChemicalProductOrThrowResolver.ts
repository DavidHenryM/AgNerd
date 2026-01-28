import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstChemicalProductOrThrowArgs } from "./args/FindFirstChemicalProductOrThrowArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalProduct)
export class FindFirstChemicalProductOrThrowResolver {
  @TypeGraphQL.Query((_returns) => ChemicalProduct, {
    nullable: true,
  })
  async findFirstChemicalProductOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstChemicalProductOrThrowArgs,
  ): Promise<ChemicalProduct | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).chemicalProduct.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

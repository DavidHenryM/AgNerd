import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneChemicalProductArgs } from "./args/UpsertOneChemicalProductArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalProduct)
export class UpsertOneChemicalProductResolver {
  @TypeGraphQL.Mutation((_returns) => ChemicalProduct, {
    nullable: false,
  })
  async upsertOneChemicalProduct(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneChemicalProductArgs,
  ): Promise<ChemicalProduct> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).chemicalProduct.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

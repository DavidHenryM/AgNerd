import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateChemicalProductArgs } from "./args/AggregateChemicalProductArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { AggregateChemicalProduct } from "../../outputs/AggregateChemicalProduct";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalProduct)
export class AggregateChemicalProductResolver {
  @TypeGraphQL.Query((_returns) => AggregateChemicalProduct, {
    nullable: false,
  })
  async aggregateChemicalProduct(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateChemicalProductArgs,
  ): Promise<AggregateChemicalProduct> {
    return getPrismaFromContext(ctx).chemicalProduct.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueChemicalProductArgs } from "./args/FindUniqueChemicalProductArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ChemicalProduct)
export class FindUniqueChemicalProductResolver {
  @TypeGraphQL.Query(_returns => ChemicalProduct, {
    nullable: true
  })
  async chemicalProduct(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueChemicalProductArgs): Promise<ChemicalProduct | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalProduct.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

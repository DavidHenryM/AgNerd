import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { CreateOneChemicalProductArgs } from "./args/CreateOneChemicalProductArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ChemicalProduct)
export class CreateOneChemicalProductResolver {
  @TypeGraphQL.Mutation(_returns => ChemicalProduct, {
    nullable: false
  })
  async createOneChemicalProduct(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOneChemicalProductArgs): Promise<ChemicalProduct> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalProduct.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

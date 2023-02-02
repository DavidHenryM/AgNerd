import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpdateOneChemicalProductArgs } from "./args/UpdateOneChemicalProductArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ChemicalProduct)
export class UpdateOneChemicalProductResolver {
  @TypeGraphQL.Mutation(_returns => ChemicalProduct, {
    nullable: true
  })
  async updateOneChemicalProduct(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneChemicalProductArgs): Promise<ChemicalProduct | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalProduct.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

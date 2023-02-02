import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { GroupByChemicalProductArgs } from "./args/GroupByChemicalProductArgs";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { ChemicalProductGroupBy } from "../../outputs/ChemicalProductGroupBy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ChemicalProduct)
export class GroupByChemicalProductResolver {
  @TypeGraphQL.Query(_returns => [ChemicalProductGroupBy], {
    nullable: false
  })
  async groupByChemicalProduct(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByChemicalProductArgs): Promise<ChemicalProductGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalProduct.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}

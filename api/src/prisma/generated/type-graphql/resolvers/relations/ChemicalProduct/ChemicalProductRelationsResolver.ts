import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalProduct)
export class ChemicalProductRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => ChemicalTreatment, {
    nullable: false,
  })
  async treatment(
    @TypeGraphQL.Root() chemicalProduct: ChemicalProduct,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<ChemicalTreatment> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .chemicalProduct.findUniqueOrThrow({
        where: {
          id: chemicalProduct.id,
        },
      })
      .treatment({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

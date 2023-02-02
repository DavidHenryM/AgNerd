import * as TypeGraphQL from "type-graphql";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ChemicalProduct)
export class ChemicalProductRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => ChemicalTreatment, {
    nullable: false
  })
  async treatment(@TypeGraphQL.Root() chemicalProduct: ChemicalProduct, @TypeGraphQL.Ctx() ctx: any): Promise<ChemicalTreatment> {
    return getPrismaFromContext(ctx).chemicalProduct.findUnique({
      where: {
        id: chemicalProduct.id,
      },
    }).treatment({});
  }
}

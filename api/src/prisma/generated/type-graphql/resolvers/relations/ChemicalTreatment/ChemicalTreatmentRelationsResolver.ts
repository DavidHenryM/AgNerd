import * as TypeGraphQL from "type-graphql";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ChemicalTreatment)
export class ChemicalTreatmentRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => LivestockUnit, {
    nullable: false
  })
  async liveStockUnit(@TypeGraphQL.Root() chemicalTreatment: ChemicalTreatment, @TypeGraphQL.Ctx() ctx: any): Promise<LivestockUnit> {
    return getPrismaFromContext(ctx).chemicalTreatment.findUnique({
      where: {
        id: chemicalTreatment.id,
      },
    }).liveStockUnit({});
  }

  @TypeGraphQL.FieldResolver(_type => ChemicalProduct, {
    nullable: true
  })
  async product(@TypeGraphQL.Root() chemicalTreatment: ChemicalTreatment, @TypeGraphQL.Ctx() ctx: any): Promise<ChemicalProduct | null> {
    return getPrismaFromContext(ctx).chemicalTreatment.findUnique({
      where: {
        id: chemicalTreatment.id,
      },
    }).product({});
  }
}

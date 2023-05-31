import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { LivestockUnit } from "../../../models/LivestockUnit";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalTreatment)
export class ChemicalTreatmentRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: false,
  })
  async liveStockUnit(
    @TypeGraphQL.Root() chemicalTreatment: ChemicalTreatment,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<LivestockUnit> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .chemicalTreatment.findUniqueOrThrow({
        where: {
          id: chemicalTreatment.id,
        },
      })
      .liveStockUnit({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => ChemicalProduct, {
    nullable: true,
  })
  async product(
    @TypeGraphQL.Root() chemicalTreatment: ChemicalTreatment,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<ChemicalProduct | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .chemicalTreatment.findUniqueOrThrow({
        where: {
          id: chemicalTreatment.id,
        },
      })
      .product({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

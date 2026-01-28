import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import { ChemicalProduct } from "../../../models/ChemicalProduct";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { ChemicalProductActiveIngredientsArgs } from "./args/ChemicalProductActiveIngredientsArgs";
import { ChemicalProductChemicalTreatmentArgs } from "./args/ChemicalProductChemicalTreatmentArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => ChemicalProduct)
export class ChemicalProductRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [ActiveIngredient], {
    nullable: false,
  })
  async activeIngredients(
    @TypeGraphQL.Root() chemicalProduct: ChemicalProduct,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ChemicalProductActiveIngredientsArgs,
  ): Promise<ActiveIngredient[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .chemicalProduct.findUniqueOrThrow({
        where: {
          id: chemicalProduct.id,
        },
      })
      .activeIngredients({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [ChemicalTreatment], {
    nullable: false,
  })
  async ChemicalTreatment(
    @TypeGraphQL.Root() chemicalProduct: ChemicalProduct,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: ChemicalProductChemicalTreatmentArgs,
  ): Promise<ChemicalTreatment[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .chemicalProduct.findUniqueOrThrow({
        where: {
          id: chemicalProduct.id,
        },
      })
      .ChemicalTreatment({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

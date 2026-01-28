import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCountActiveIngredientsArgs } from "./args/ChemicalProductCountActiveIngredientsArgs";
import { ChemicalProductCountChemicalTreatmentArgs } from "./args/ChemicalProductCountChemicalTreatmentArgs";

@TypeGraphQL.ObjectType("ChemicalProductCount", {})
export class ChemicalProductCount {
  activeIngredients!: number;
  ChemicalTreatment!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "activeIngredients",
    nullable: false,
  })
  getActiveIngredients(
    @TypeGraphQL.Root() root: ChemicalProductCount,
    @TypeGraphQL.Args() args: ChemicalProductCountActiveIngredientsArgs,
  ): number {
    return root.activeIngredients;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "ChemicalTreatment",
    nullable: false,
  })
  getChemicalTreatment(
    @TypeGraphQL.Root() root: ChemicalProductCount,
    @TypeGraphQL.Args() args: ChemicalProductCountChemicalTreatmentArgs,
  ): number {
    return root.ChemicalTreatment;
  }
}

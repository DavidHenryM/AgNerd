import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateNestedOneWithoutActiveIngredientsInput } from "../inputs/ChemicalProductCreateNestedOneWithoutActiveIngredientsInput";
import { Ingredient } from "../../enums/Ingredient";

@TypeGraphQL.InputType("ActiveIngredientCreateInput", {})
export class ActiveIngredientCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => Ingredient, {
    nullable: false,
  })
  ingredient!: "TRICLABENDAZOLE" | "ABAMECTIN";

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  mgPermL!: number;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateNestedOneWithoutActiveIngredientsInput,
    {
      nullable: false,
    },
  )
  product!: ChemicalProductCreateNestedOneWithoutActiveIngredientsInput;
}

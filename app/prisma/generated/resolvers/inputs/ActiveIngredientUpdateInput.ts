import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductUpdateOneRequiredWithoutActiveIngredientsNestedInput } from "../inputs/ChemicalProductUpdateOneRequiredWithoutActiveIngredientsNestedInput";
import { EnumIngredientFieldUpdateOperationsInput } from "../inputs/EnumIngredientFieldUpdateOperationsInput";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";

@TypeGraphQL.InputType("ActiveIngredientUpdateInput", {})
export class ActiveIngredientUpdateInput {
  @TypeGraphQL.Field((_type) => EnumIngredientFieldUpdateOperationsInput, {
    nullable: true,
  })
  ingredient?: EnumIngredientFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  mgPermL?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      ChemicalProductUpdateOneRequiredWithoutActiveIngredientsNestedInput,
    {
      nullable: true,
    },
  )
  product?:
    | ChemicalProductUpdateOneRequiredWithoutActiveIngredientsNestedInput
    | undefined;
}

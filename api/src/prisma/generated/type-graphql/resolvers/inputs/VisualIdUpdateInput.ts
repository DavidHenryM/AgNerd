import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput } from "../inputs/LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput";
import { NullableEnumVisualIdColourFieldUpdateOperationsInput } from "../inputs/NullableEnumVisualIdColourFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("VisualIdUpdateInput", {
  isAbstract: true,
})
export class VisualIdUpdateInput {
  @TypeGraphQL.Field(
    (_type) => NullableEnumVisualIdColourFieldUpdateOperationsInput,
    {
      nullable: true,
    }
  )
  colour?: NullableEnumVisualIdColourFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  number?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput,
    {
      nullable: true,
    }
  )
  livestockUnit?:
    | LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput
    | undefined;
}

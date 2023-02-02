import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput } from "../inputs/LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput";
import { NullableEnumVisualIdColourFieldUpdateOperationsInput } from "../inputs/NullableEnumVisualIdColourFieldUpdateOperationsInput";
import { NullableIntFieldUpdateOperationsInput } from "../inputs/NullableIntFieldUpdateOperationsInput";

@TypeGraphQL.InputType("VisualIdUpdateInput", {
  isAbstract: true
})
export class VisualIdUpdateInput {
  @TypeGraphQL.Field(_type => LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput, {
    nullable: true
  })
  livestockUnit?: LivestockUnitUpdateOneRequiredWithoutVisualidNestedInput | undefined;

  @TypeGraphQL.Field(_type => NullableEnumVisualIdColourFieldUpdateOperationsInput, {
    nullable: true
  })
  colour?: NullableEnumVisualIdColourFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableIntFieldUpdateOperationsInput, {
    nullable: true
  })
  number?: NullableIntFieldUpdateOperationsInput | undefined;
}

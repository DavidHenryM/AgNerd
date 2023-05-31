import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentUpdateOneRequiredWithoutProductNestedInput } from "../inputs/ChemicalTreatmentUpdateOneRequiredWithoutProductNestedInput";
import { IntFieldUpdateOperationsInput } from "../inputs/IntFieldUpdateOperationsInput";
import { NullableFloatFieldUpdateOperationsInput } from "../inputs/NullableFloatFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("ChemicalProductUpdateInput", {
  isAbstract: true,
})
export class ChemicalProductUpdateInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  manufacturer?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  product_name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  serial_number?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  volume_ml?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableFloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  cost?: NullableFloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentUpdateOneRequiredWithoutProductNestedInput,
    {
      nullable: true,
    }
  )
  treatment?:
    | ChemicalTreatmentUpdateOneRequiredWithoutProductNestedInput
    | undefined;
}

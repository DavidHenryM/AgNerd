import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductUpdateOneRequiredWithoutChemicalTreatmentNestedInput } from "../inputs/ChemicalProductUpdateOneRequiredWithoutChemicalTreatmentNestedInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumApplicationMethodFieldUpdateOperationsInput } from "../inputs/EnumApplicationMethodFieldUpdateOperationsInput";
import { IntFieldUpdateOperationsInput } from "../inputs/IntFieldUpdateOperationsInput";

@TypeGraphQL.InputType("ChemicalTreatmentUpdateWithoutLiveStockUnitInput", {})
export class ChemicalTreatmentUpdateWithoutLiveStockUnitInput {
  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  treatmentDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EnumApplicationMethodFieldUpdateOperationsInput,
    {
      nullable: true,
    },
  )
  applicationMethod?:
    | EnumApplicationMethodFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  volumeMl?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      ChemicalProductUpdateOneRequiredWithoutChemicalTreatmentNestedInput,
    {
      nullable: true,
    },
  )
  product?:
    | ChemicalProductUpdateOneRequiredWithoutChemicalTreatmentNestedInput
    | undefined;
}

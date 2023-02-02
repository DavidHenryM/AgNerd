import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumApplicationMethodFieldUpdateOperationsInput } from "../inputs/EnumApplicationMethodFieldUpdateOperationsInput";
import { IntFieldUpdateOperationsInput } from "../inputs/IntFieldUpdateOperationsInput";
import { LivestockUnitUpdateOneRequiredWithoutTreatmentsNestedInput } from "../inputs/LivestockUnitUpdateOneRequiredWithoutTreatmentsNestedInput";

@TypeGraphQL.InputType("ChemicalTreatmentUpdateWithoutProductInput", {
  isAbstract: true
})
export class ChemicalTreatmentUpdateWithoutProductInput {
  @TypeGraphQL.Field(_type => LivestockUnitUpdateOneRequiredWithoutTreatmentsNestedInput, {
    nullable: true
  })
  liveStockUnit?: LivestockUnitUpdateOneRequiredWithoutTreatmentsNestedInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  treatmentDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumApplicationMethodFieldUpdateOperationsInput, {
    nullable: true
  })
  applicationMethod?: EnumApplicationMethodFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => IntFieldUpdateOperationsInput, {
    nullable: true
  })
  volume_ml?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => IntFieldUpdateOperationsInput, {
    nullable: true
  })
  witholdingPeriodDays?: IntFieldUpdateOperationsInput | undefined;
}

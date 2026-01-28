import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { MobUpdateManyWithoutGrazeNestedInput } from "../inputs/MobUpdateManyWithoutGrazeNestedInput";
import { NullableDateTimeFieldUpdateOperationsInput } from "../inputs/NullableDateTimeFieldUpdateOperationsInput";
import { NullableFloatFieldUpdateOperationsInput } from "../inputs/NullableFloatFieldUpdateOperationsInput";
import { PaddockUpdateOneRequiredWithoutGrazeNestedInput } from "../inputs/PaddockUpdateOneRequiredWithoutGrazeNestedInput";

@TypeGraphQL.InputType("GrazeUpdateInput", {})
export class GrazeUpdateInput {
  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  startDatetime?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  endDateTime?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableFloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  dseDaysPerHectare?: NullableFloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockUpdateOneRequiredWithoutGrazeNestedInput,
    {
      nullable: true,
    },
  )
  paddock?: PaddockUpdateOneRequiredWithoutGrazeNestedInput | undefined;

  @TypeGraphQL.Field((_type) => MobUpdateManyWithoutGrazeNestedInput, {
    nullable: true,
  })
  mob?: MobUpdateManyWithoutGrazeNestedInput | undefined;
}

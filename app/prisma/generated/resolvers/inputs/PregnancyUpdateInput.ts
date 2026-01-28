import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateManyWithoutPregnancyNestedInput } from "../inputs/LivestockUnitUpdateManyWithoutPregnancyNestedInput";
import { NullableDateTimeFieldUpdateOperationsInput } from "../inputs/NullableDateTimeFieldUpdateOperationsInput";
import { PregnancyTestUpdateManyWithoutPregnancyNestedInput } from "../inputs/PregnancyTestUpdateManyWithoutPregnancyNestedInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("PregnancyUpdateInput", {})
export class PregnancyUpdateInput {
  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  earliestPossibleConception?:
    | NullableDateTimeFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  latestPossibleConception?:
    | NullableDateTimeFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  conception?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  dueDate?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  earliestPossibleBirth?:
    | NullableDateTimeFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  latestPossibleBirth?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  pregnancySireId?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitUpdateManyWithoutPregnancyNestedInput,
    {
      nullable: true,
    },
  )
  parents?: LivestockUnitUpdateManyWithoutPregnancyNestedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PregnancyTestUpdateManyWithoutPregnancyNestedInput,
    {
      nullable: true,
    },
  )
  pregnancyTest?:
    | PregnancyTestUpdateManyWithoutPregnancyNestedInput
    | undefined;
}

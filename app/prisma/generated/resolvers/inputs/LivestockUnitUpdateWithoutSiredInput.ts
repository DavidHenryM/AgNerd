import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFieldUpdateOperationsInput } from "../inputs/BoolFieldUpdateOperationsInput";
import { BreedUpdateOneWithoutMembersNestedInput } from "../inputs/BreedUpdateOneWithoutMembersNestedInput";
import { ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput } from "../inputs/ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumSexFieldUpdateOperationsInput } from "../inputs/EnumSexFieldUpdateOperationsInput";
import { EnumStockClassFieldUpdateOperationsInput } from "../inputs/EnumStockClassFieldUpdateOperationsInput";
import { EstimatedBreedingValueResultUpdateManyWithoutLivestockUnitNestedInput } from "../inputs/EstimatedBreedingValueResultUpdateManyWithoutLivestockUnitNestedInput";
import { IntFieldUpdateOperationsInput } from "../inputs/IntFieldUpdateOperationsInput";
import { LivestockUnitUpdateManyWithoutDamNestedInput } from "../inputs/LivestockUnitUpdateManyWithoutDamNestedInput";
import { LivestockUnitUpdateOneWithoutBirthedNestedInput } from "../inputs/LivestockUnitUpdateOneWithoutBirthedNestedInput";
import { LivestockUnitUpdateOneWithoutSiredNestedInput } from "../inputs/LivestockUnitUpdateOneWithoutSiredNestedInput";
import { MobUpdateOneWithoutMembersNestedInput } from "../inputs/MobUpdateOneWithoutMembersNestedInput";
import { NullableDateTimeFieldUpdateOperationsInput } from "../inputs/NullableDateTimeFieldUpdateOperationsInput";
import { NullableEnumCommercialClassFieldUpdateOperationsInput } from "../inputs/NullableEnumCommercialClassFieldUpdateOperationsInput";
import { NullableEnumVisualIdColourFieldUpdateOperationsInput } from "../inputs/NullableEnumVisualIdColourFieldUpdateOperationsInput";
import { NullableFloatFieldUpdateOperationsInput } from "../inputs/NullableFloatFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { PregnancyUpdateManyWithoutParentsNestedInput } from "../inputs/PregnancyUpdateManyWithoutParentsNestedInput";
import { WeightRecordUpdateManyWithoutLivestockUnitNestedInput } from "../inputs/WeightRecordUpdateManyWithoutLivestockUnitNestedInput";

@TypeGraphQL.InputType("LivestockUnitUpdateWithoutSiredInput", {})
export class LivestockUnitUpdateWithoutSiredInput {
  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  nlisId?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  visualIdLine1?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  visualIdLine2?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  visualIdLine3?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => NullableEnumVisualIdColourFieldUpdateOperationsInput,
    {
      nullable: true,
    },
  )
  visualIdBackgroundColour?:
    | NullableEnumVisualIdColourFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => NullableEnumVisualIdColourFieldUpdateOperationsInput,
    {
      nullable: true,
    },
  )
  visualIdTextColour?:
    | NullableEnumVisualIdColourFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassFieldUpdateOperationsInput, {
    nullable: true,
  })
  class?: EnumStockClassFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => NullableEnumCommercialClassFieldUpdateOperationsInput,
    {
      nullable: true,
    },
  )
  commercialClass?:
    | NullableEnumCommercialClassFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  name?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  comment?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumSexFieldUpdateOperationsInput, {
    nullable: true,
  })
  sex?: EnumSexFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  birthDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => BoolFieldUpdateOperationsInput, {
    nullable: true,
  })
  desexed?: BoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  drySheepEquivalent?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableFloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  purchasePrice?: NullableFloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  angusTechId?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => BoolFieldUpdateOperationsInput, {
    nullable: true,
  })
  active?: BoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => BreedUpdateOneWithoutMembersNestedInput, {
    nullable: true,
  })
  breed?: BreedUpdateOneWithoutMembersNestedInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateOneWithoutSiredNestedInput, {
    nullable: true,
  })
  sire?: LivestockUnitUpdateOneWithoutSiredNestedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitUpdateOneWithoutBirthedNestedInput,
    {
      nullable: true,
    },
  )
  dam?: LivestockUnitUpdateOneWithoutBirthedNestedInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateManyWithoutDamNestedInput, {
    nullable: true,
  })
  birthed?: LivestockUnitUpdateManyWithoutDamNestedInput | undefined;

  @TypeGraphQL.Field((_type) => MobUpdateOneWithoutMembersNestedInput, {
    nullable: true,
  })
  mob?: MobUpdateOneWithoutMembersNestedInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyUpdateManyWithoutParentsNestedInput, {
    nullable: true,
  })
  pregnancy?: PregnancyUpdateManyWithoutParentsNestedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => WeightRecordUpdateManyWithoutLivestockUnitNestedInput,
    {
      nullable: true,
    },
  )
  weights?: WeightRecordUpdateManyWithoutLivestockUnitNestedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput,
    {
      nullable: true,
    },
  )
  treatments?:
    | ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      EstimatedBreedingValueResultUpdateManyWithoutLivestockUnitNestedInput,
    {
      nullable: true,
    },
  )
  estimatedBreedingValueResult?:
    | EstimatedBreedingValueResultUpdateManyWithoutLivestockUnitNestedInput
    | undefined;
}

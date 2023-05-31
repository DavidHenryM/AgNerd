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
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";
import { IntFieldUpdateOperationsInput } from "../inputs/IntFieldUpdateOperationsInput";
import { LivestockUnitUpdateOneWithoutSireNestedInput } from "../inputs/LivestockUnitUpdateOneWithoutSireNestedInput";
import { MobUpdateOneRequiredWithoutMembersNestedInput } from "../inputs/MobUpdateOneRequiredWithoutMembersNestedInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { PregnancyUpdateManyWithoutParentsNestedInput } from "../inputs/PregnancyUpdateManyWithoutParentsNestedInput";
import { VisualIdUpdateOneWithoutLivestockUnitNestedInput } from "../inputs/VisualIdUpdateOneWithoutLivestockUnitNestedInput";
import { WeightRecordUpdateManyWithoutLivestockUnitNestedInput } from "../inputs/WeightRecordUpdateManyWithoutLivestockUnitNestedInput";

@TypeGraphQL.InputType("LivestockUnitUpdateWithoutSireInput", {
  isAbstract: true,
})
export class LivestockUnitUpdateWithoutSireInput {
  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  nlisid?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassFieldUpdateOperationsInput, {
    nullable: true,
  })
  class?: EnumStockClassFieldUpdateOperationsInput | undefined;

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
  birthdate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => BoolFieldUpdateOperationsInput, {
    nullable: true,
  })
  desexed?: BoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  drySheepEquivalent?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  purchasePrice?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  purchaseDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => VisualIdUpdateOneWithoutLivestockUnitNestedInput,
    {
      nullable: true,
    }
  )
  visualid?: VisualIdUpdateOneWithoutLivestockUnitNestedInput | undefined;

  @TypeGraphQL.Field((_type) => BreedUpdateOneWithoutMembersNestedInput, {
    nullable: true,
  })
  breed?: BreedUpdateOneWithoutMembersNestedInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateOneWithoutSireNestedInput, {
    nullable: true,
  })
  dam?: LivestockUnitUpdateOneWithoutSireNestedInput | undefined;

  @TypeGraphQL.Field((_type) => MobUpdateOneRequiredWithoutMembersNestedInput, {
    nullable: true,
  })
  mob?: MobUpdateOneRequiredWithoutMembersNestedInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyUpdateManyWithoutParentsNestedInput, {
    nullable: true,
  })
  pregnancy?: PregnancyUpdateManyWithoutParentsNestedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => WeightRecordUpdateManyWithoutLivestockUnitNestedInput,
    {
      nullable: true,
    }
  )
  weights?: WeightRecordUpdateManyWithoutLivestockUnitNestedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput,
    {
      nullable: true,
    }
  )
  treatments?:
    | ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput
    | undefined;
}

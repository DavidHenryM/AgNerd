import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFieldUpdateOperationsInput } from "../inputs/BoolFieldUpdateOperationsInput";
import { BreedUpdateOneWithoutMembersNestedInput } from "../inputs/BreedUpdateOneWithoutMembersNestedInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumSexFieldUpdateOperationsInput } from "../inputs/EnumSexFieldUpdateOperationsInput";
import { LivestockUnitUpdateOneWithoutDamNestedInput } from "../inputs/LivestockUnitUpdateOneWithoutDamNestedInput";
import { LivestockUnitUpdateOneWithoutSireNestedInput } from "../inputs/LivestockUnitUpdateOneWithoutSireNestedInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { WeightRecordUpdateManyWithoutLivestockUnitNestedInput } from "../inputs/WeightRecordUpdateManyWithoutLivestockUnitNestedInput";

@TypeGraphQL.InputType("LivestockUnitUpdateWithoutMobInput", {
  isAbstract: true
})
export class LivestockUnitUpdateWithoutMobInput {
  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  nlisid?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => BreedUpdateOneWithoutMembersNestedInput, {
    nullable: true
  })
  breed?: BreedUpdateOneWithoutMembersNestedInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  comment?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumSexFieldUpdateOperationsInput, {
    nullable: true
  })
  sex?: EnumSexFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  birthdate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => BoolFieldUpdateOperationsInput, {
    nullable: true
  })
  desexed?: BoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpdateOneWithoutDamNestedInput, {
    nullable: true
  })
  sire?: LivestockUnitUpdateOneWithoutDamNestedInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitUpdateOneWithoutSireNestedInput, {
    nullable: true
  })
  dam?: LivestockUnitUpdateOneWithoutSireNestedInput | undefined;

  @TypeGraphQL.Field(_type => WeightRecordUpdateManyWithoutLivestockUnitNestedInput, {
    nullable: true
  })
  weights?: WeightRecordUpdateManyWithoutLivestockUnitNestedInput | undefined;
}

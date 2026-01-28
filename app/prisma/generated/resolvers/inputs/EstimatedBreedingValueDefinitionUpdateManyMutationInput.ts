import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFieldUpdateOperationsInput } from "../inputs/BoolFieldUpdateOperationsInput";
import { EnumEbvCategoryFieldUpdateOperationsInput } from "../inputs/EnumEbvCategoryFieldUpdateOperationsInput";
import { EnumMeasurementFieldUpdateOperationsInput } from "../inputs/EnumMeasurementFieldUpdateOperationsInput";
import { EnumUnitsFieldUpdateOperationsInput } from "../inputs/EnumUnitsFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionUpdateManyMutationInput",
  {},
)
export class EstimatedBreedingValueDefinitionUpdateManyMutationInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  code?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumEbvCategoryFieldUpdateOperationsInput, {
    nullable: true,
  })
  category?: EnumEbvCategoryFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  description?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => BoolFieldUpdateOperationsInput, {
    nullable: true,
  })
  higherIsBetter?: BoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumUnitsFieldUpdateOperationsInput, {
    nullable: true,
  })
  units?: EnumUnitsFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumMeasurementFieldUpdateOperationsInput, {
    nullable: true,
  })
  measurement?: EnumMeasurementFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  angusTechFieldNameValue?:
    | NullableStringFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  angusTechFieldNamePercentile?:
    | NullableStringFieldUpdateOperationsInput
    | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  angusTechFieldNameAccuracy?:
    | NullableStringFieldUpdateOperationsInput
    | undefined;
}

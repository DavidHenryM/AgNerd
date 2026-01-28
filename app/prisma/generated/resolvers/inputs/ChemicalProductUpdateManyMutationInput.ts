import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumChemicalManufacturerFieldUpdateOperationsInput } from "../inputs/EnumChemicalManufacturerFieldUpdateOperationsInput";
import { EnumChemicalProductNameFieldUpdateOperationsInput } from "../inputs/EnumChemicalProductNameFieldUpdateOperationsInput";
import { EnumChemicalTypeFieldUpdateOperationsInput } from "../inputs/EnumChemicalTypeFieldUpdateOperationsInput";
import { IntFieldUpdateOperationsInput } from "../inputs/IntFieldUpdateOperationsInput";
import { NullableFloatFieldUpdateOperationsInput } from "../inputs/NullableFloatFieldUpdateOperationsInput";
import { NullableIntFieldUpdateOperationsInput } from "../inputs/NullableIntFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("ChemicalProductUpdateManyMutationInput", {})
export class ChemicalProductUpdateManyMutationInput {
  @TypeGraphQL.Field(
    (_type) => EnumChemicalManufacturerFieldUpdateOperationsInput,
    {
      nullable: true,
    },
  )
  manufacturer?: EnumChemicalManufacturerFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EnumChemicalProductNameFieldUpdateOperationsInput,
    {
      nullable: true,
    },
  )
  productName?: EnumChemicalProductNameFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  serialNumber?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  batchNumber?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableIntFieldUpdateOperationsInput, {
    nullable: true,
  })
  volumeMl?: NullableIntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableFloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  cost?: NullableFloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumChemicalTypeFieldUpdateOperationsInput, {
    nullable: true,
  })
  type?: EnumChemicalTypeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  witholdingPeriodDays?: IntFieldUpdateOperationsInput | undefined;
}

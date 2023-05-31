import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";
import { LivestockUnitPositionUpdateOneRequiredWithoutLocationNestedInput } from "../inputs/LivestockUnitPositionUpdateOneRequiredWithoutLocationNestedInput";

@TypeGraphQL.InputType("GeoPointUpdateWithoutPaddockInput", {
  isAbstract: true,
})
export class GeoPointUpdateWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  latitude?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  longitude?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateOneRequiredWithoutLocationNestedInput,
    {
      nullable: true,
    }
  )
  livestockUnitPosition?:
    | LivestockUnitPositionUpdateOneRequiredWithoutLocationNestedInput
    | undefined;
}

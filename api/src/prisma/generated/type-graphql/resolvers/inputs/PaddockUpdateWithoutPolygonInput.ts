import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";
import { GrazeUpdateManyWithoutPaddockNestedInput } from "../inputs/GrazeUpdateManyWithoutPaddockNestedInput";
import { LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput } from "../inputs/LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("PaddockUpdateWithoutPolygonInput", {
  isAbstract: true,
})
export class PaddockUpdateWithoutPolygonInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  areaHa?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeUpdateManyWithoutPaddockNestedInput, {
    nullable: true,
  })
  graze?: GrazeUpdateManyWithoutPaddockNestedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput,
    {
      nullable: true,
    }
  )
  livestockUnitPosition?:
    | LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput
    | undefined;
}

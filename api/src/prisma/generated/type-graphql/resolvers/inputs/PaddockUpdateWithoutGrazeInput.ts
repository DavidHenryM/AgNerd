import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";
import { GeoPointUpdateManyWithoutPaddockNestedInput } from "../inputs/GeoPointUpdateManyWithoutPaddockNestedInput";
import { LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput } from "../inputs/LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("PaddockUpdateWithoutGrazeInput", {
  isAbstract: true
})
export class PaddockUpdateWithoutGrazeInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => GeoPointUpdateManyWithoutPaddockNestedInput, {
    nullable: true
  })
  polygon?: GeoPointUpdateManyWithoutPaddockNestedInput | undefined;

  @TypeGraphQL.Field(_type => FloatFieldUpdateOperationsInput, {
    nullable: true
  })
  areaHa?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput, {
    nullable: true
  })
  livestockUnitPosition?: LivestockUnitPositionUpdateOneRequiredWithoutPaddockNestedInput | undefined;
}

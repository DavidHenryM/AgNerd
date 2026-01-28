import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";
import { LivestockUnitPositionUpdateOneWithoutLocationNestedInput } from "../inputs/LivestockUnitPositionUpdateOneWithoutLocationNestedInput";
import { PaddockUpdateOneRequiredWithoutPolygonNestedInput } from "../inputs/PaddockUpdateOneRequiredWithoutPolygonNestedInput";

@TypeGraphQL.InputType("GeoPointUpdateInput", {})
export class GeoPointUpdateInput {
  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  latitude?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  longitude?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockUpdateOneRequiredWithoutPolygonNestedInput,
    {
      nullable: true,
    },
  )
  paddock?: PaddockUpdateOneRequiredWithoutPolygonNestedInput | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitPositionUpdateOneWithoutLocationNestedInput,
    {
      nullable: true,
    },
  )
  livestockUnitPosition?:
    | LivestockUnitPositionUpdateOneWithoutLocationNestedInput
    | undefined;
}

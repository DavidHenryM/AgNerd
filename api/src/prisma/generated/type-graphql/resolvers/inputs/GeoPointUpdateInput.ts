import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";
import { PaddockUpdateOneRequiredWithoutPolygonNestedInput } from "../inputs/PaddockUpdateOneRequiredWithoutPolygonNestedInput";

@TypeGraphQL.InputType("GeoPointUpdateInput", {
  isAbstract: true
})
export class GeoPointUpdateInput {
  @TypeGraphQL.Field(_type => FloatFieldUpdateOperationsInput, {
    nullable: true
  })
  latitude?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => FloatFieldUpdateOperationsInput, {
    nullable: true
  })
  longitude?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => PaddockUpdateOneRequiredWithoutPolygonNestedInput, {
    nullable: true
  })
  paddock?: PaddockUpdateOneRequiredWithoutPolygonNestedInput | undefined;
}

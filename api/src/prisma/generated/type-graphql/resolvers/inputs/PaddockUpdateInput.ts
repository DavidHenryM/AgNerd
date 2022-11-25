import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointUpdateManyWithoutPaddockNestedInput } from "../inputs/GeoPointUpdateManyWithoutPaddockNestedInput";
import { GrazeUpdateManyWithoutPaddockNestedInput } from "../inputs/GrazeUpdateManyWithoutPaddockNestedInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("PaddockUpdateInput", {
  isAbstract: true
})
export class PaddockUpdateInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => GeoPointUpdateManyWithoutPaddockNestedInput, {
    nullable: true
  })
  polygon?: GeoPointUpdateManyWithoutPaddockNestedInput | undefined;

  @TypeGraphQL.Field(_type => GrazeUpdateManyWithoutPaddockNestedInput, {
    nullable: true
  })
  graze?: GrazeUpdateManyWithoutPaddockNestedInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { PaddockUpdateOneWithoutLivestockUnitPositionNestedInput } from "../inputs/PaddockUpdateOneWithoutLivestockUnitPositionNestedInput";

@TypeGraphQL.InputType("LivestockUnitPositionUpdateWithoutLocationInput", {
  isAbstract: true,
})
export class LivestockUnitPositionUpdateWithoutLocationInput {
  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  date?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(
    (_type) => PaddockUpdateOneWithoutLivestockUnitPositionNestedInput,
    {
      nullable: true,
    }
  )
  paddock?: PaddockUpdateOneWithoutLivestockUnitPositionNestedInput | undefined;
}

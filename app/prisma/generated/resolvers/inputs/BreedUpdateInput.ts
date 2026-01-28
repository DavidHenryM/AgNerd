import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumStockClassFieldUpdateOperationsInput } from "../inputs/EnumStockClassFieldUpdateOperationsInput";
import { LivestockUnitUpdateOneWithoutBreedNestedInput } from "../inputs/LivestockUnitUpdateOneWithoutBreedNestedInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("BreedUpdateInput", {})
export class BreedUpdateInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassFieldUpdateOperationsInput, {
    nullable: true,
  })
  class?: EnumStockClassFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateOneWithoutBreedNestedInput, {
    nullable: true,
  })
  members?: LivestockUnitUpdateOneWithoutBreedNestedInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NullableEnumVisualIdColourFieldUpdateOperationsInput } from "../inputs/NullableEnumVisualIdColourFieldUpdateOperationsInput";
import { NullableIntFieldUpdateOperationsInput } from "../inputs/NullableIntFieldUpdateOperationsInput";

@TypeGraphQL.InputType("VisualIdUpdateWithoutLivestockUnitInput", {
  isAbstract: true
})
export class VisualIdUpdateWithoutLivestockUnitInput {
  @TypeGraphQL.Field(_type => NullableEnumVisualIdColourFieldUpdateOperationsInput, {
    nullable: true
  })
  colour?: NullableEnumVisualIdColourFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableIntFieldUpdateOperationsInput, {
    nullable: true
  })
  number?: NullableIntFieldUpdateOperationsInput | undefined;
}

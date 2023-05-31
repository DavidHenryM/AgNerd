import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NullableEnumVisualIdColourFieldUpdateOperationsInput } from "../inputs/NullableEnumVisualIdColourFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("VisualIdUpdateManyMutationInput", {
  isAbstract: true,
})
export class VisualIdUpdateManyMutationInput {
  @TypeGraphQL.Field(
    (_type) => NullableEnumVisualIdColourFieldUpdateOperationsInput,
    {
      nullable: true,
    }
  )
  colour?: NullableEnumVisualIdColourFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
  number?: NullableStringFieldUpdateOperationsInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumWeighMethodFieldUpdateOperationsInput } from "../inputs/EnumWeighMethodFieldUpdateOperationsInput";
import { FloatFieldUpdateOperationsInput } from "../inputs/FloatFieldUpdateOperationsInput";

@TypeGraphQL.InputType("WeightRecordUpdateManyMutationInput", {
  isAbstract: true,
})
export class WeightRecordUpdateManyMutationInput {
  @TypeGraphQL.Field((_type) => FloatFieldUpdateOperationsInput, {
    nullable: true,
  })
  weight?: FloatFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
  dateMeasured?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EnumWeighMethodFieldUpdateOperationsInput, {
    nullable: true,
  })
  method?: EnumWeighMethodFieldUpdateOperationsInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumPregnancyTestResultFieldUpdateOperationsInput } from "../inputs/EnumPregnancyTestResultFieldUpdateOperationsInput";
import { EnumPregnancyTestTypeFieldUpdateOperationsInput } from "../inputs/EnumPregnancyTestTypeFieldUpdateOperationsInput";
import { NullableFloatFieldUpdateOperationsInput } from "../inputs/NullableFloatFieldUpdateOperationsInput";

@TypeGraphQL.InputType("PregnancyTestUpdateManyMutationInput", {
  isAbstract: true
})
export class PregnancyTestUpdateManyMutationInput {
  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  testDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumPregnancyTestTypeFieldUpdateOperationsInput, {
    nullable: true
  })
  testType?: EnumPregnancyTestTypeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  resultDate?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumPregnancyTestResultFieldUpdateOperationsInput, {
    nullable: true
  })
  result?: EnumPregnancyTestResultFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableFloatFieldUpdateOperationsInput, {
    nullable: true
  })
  cost?: NullableFloatFieldUpdateOperationsInput | undefined;
}

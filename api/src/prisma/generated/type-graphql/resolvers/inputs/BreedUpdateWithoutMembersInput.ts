import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumStockClassFieldUpdateOperationsInput } from "../inputs/EnumStockClassFieldUpdateOperationsInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("BreedUpdateWithoutMembersInput", {
  isAbstract: true
})
export class BreedUpdateWithoutMembersInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumStockClassFieldUpdateOperationsInput, {
    nullable: true
  })
  class?: EnumStockClassFieldUpdateOperationsInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ApplicationMethod } from "../../enums/ApplicationMethod";

@TypeGraphQL.InputType("EnumApplicationMethodFieldUpdateOperationsInput", {
  isAbstract: true,
})
export class EnumApplicationMethodFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => ApplicationMethod, {
    nullable: true,
  })
  set?:
    | "ORAL"
    | "TRANSDERMAL"
    | "SUB_CUT_INJECTION"
    | "INTRAVENUS_INJECTION"
    | undefined;
}

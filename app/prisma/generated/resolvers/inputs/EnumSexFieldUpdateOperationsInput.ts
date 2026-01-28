import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Sex } from "../../enums/Sex";

@TypeGraphQL.InputType("EnumSexFieldUpdateOperationsInput", {})
export class EnumSexFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => Sex, {
    nullable: true,
  })
  set?: "MALE" | "FEMALE" | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.InputType(
  "NullableEnumVisualIdColourFieldUpdateOperationsInput",
  {},
)
export class NullableEnumVisualIdColourFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  set?:
    | "WHITE"
    | "ORANGE"
    | "LIGHT_GREEN"
    | "PURPLE"
    | "YELLOW"
    | "RED"
    | "SKY_BLUE"
    | "BLACK"
    | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  unset?: boolean | undefined;
}

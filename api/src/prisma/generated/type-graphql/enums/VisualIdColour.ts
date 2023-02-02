import * as TypeGraphQL from "type-graphql";

export enum VisualIdColour {
  WHITE = "WHITE",
  ORANGE = "ORANGE",
  LIGHT_GREEN = "LIGHT_GREEN",
  PURPLE = "PURPLE",
  YELLOW = "YELLOW",
  RED = "RED",
  SKY_BLUE = "SKY_BLUE",
  BLACK = "BLACK"
}
TypeGraphQL.registerEnumType(VisualIdColour, {
  name: "VisualIdColour",
  description: undefined,
});

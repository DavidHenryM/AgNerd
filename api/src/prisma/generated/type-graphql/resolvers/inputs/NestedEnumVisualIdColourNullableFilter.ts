import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.InputType("NestedEnumVisualIdColourNullableFilter", {
  isAbstract: true,
})
export class NestedEnumVisualIdColourNullableFilter {
  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  equals?:
    | "WHITE"
    | "ORANGE"
    | "LIGHT_GREEN"
    | "PURPLE"
    | "YELLOW"
    | "RED"
    | "SKY_BLUE"
    | "BLACK"
    | undefined;

  @TypeGraphQL.Field((_type) => [VisualIdColour], {
    nullable: true,
  })
  in?:
    | Array<
        | "WHITE"
        | "ORANGE"
        | "LIGHT_GREEN"
        | "PURPLE"
        | "YELLOW"
        | "RED"
        | "SKY_BLUE"
        | "BLACK"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => [VisualIdColour], {
    nullable: true,
  })
  notIn?:
    | Array<
        | "WHITE"
        | "ORANGE"
        | "LIGHT_GREEN"
        | "PURPLE"
        | "YELLOW"
        | "RED"
        | "SKY_BLUE"
        | "BLACK"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumVisualIdColourNullableFilter, {
    nullable: true,
  })
  not?: NestedEnumVisualIdColourNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  isSet?: boolean | undefined;
}

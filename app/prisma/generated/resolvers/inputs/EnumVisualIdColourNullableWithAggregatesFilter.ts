import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumVisualIdColourNullableFilter } from "../inputs/NestedEnumVisualIdColourNullableFilter";
import { NestedEnumVisualIdColourNullableWithAggregatesFilter } from "../inputs/NestedEnumVisualIdColourNullableWithAggregatesFilter";
import { NestedIntNullableFilter } from "../inputs/NestedIntNullableFilter";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.InputType("EnumVisualIdColourNullableWithAggregatesFilter", {})
export class EnumVisualIdColourNullableWithAggregatesFilter {
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

  @TypeGraphQL.Field(
    (_type) => NestedEnumVisualIdColourNullableWithAggregatesFilter,
    {
      nullable: true,
    },
  )
  not?: NestedEnumVisualIdColourNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntNullableFilter, {
    nullable: true,
  })
  _count?: NestedIntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumVisualIdColourNullableFilter, {
    nullable: true,
  })
  _min?: NestedEnumVisualIdColourNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumVisualIdColourNullableFilter, {
    nullable: true,
  })
  _max?: NestedEnumVisualIdColourNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  isSet?: boolean | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateNestedOneWithoutVisualidInput } from "../inputs/LivestockUnitCreateNestedOneWithoutVisualidInput";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.InputType("VisualIdCreateInput", {
  isAbstract: true,
})
export class VisualIdCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  colour?:
    | "WHITE"
    | "ORANGE"
    | "LIGHT_GREEN"
    | "PURPLE"
    | "YELLOW"
    | "RED"
    | "SKY_BLUE"
    | "BLACK"
    | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  number?: string | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateNestedOneWithoutVisualidInput,
    {
      nullable: false,
    }
  )
  livestockUnit!: LivestockUnitCreateNestedOneWithoutVisualidInput;
}

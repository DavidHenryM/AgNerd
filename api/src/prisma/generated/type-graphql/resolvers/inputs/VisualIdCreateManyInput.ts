import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.InputType("VisualIdCreateManyInput", {
  isAbstract: true
})
export class VisualIdCreateManyInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  livestockUnitId!: string;

  @TypeGraphQL.Field(_type => VisualIdColour, {
    nullable: true
  })
  colour?: "WHITE" | "ORANGE" | "LIGHT_GREEN" | "PURPLE" | "YELLOW" | "RED" | "SKY_BLUE" | "BLACK" | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  number?: number | undefined;
}

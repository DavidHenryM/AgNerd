import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.ObjectType("VisualIdMinAggregate", {
  isAbstract: true,
})
export class VisualIdMinAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  livestockUnitId!: string | null;

  @TypeGraphQL.Field((_type) => VisualIdColour, {
    nullable: true,
  })
  colour!:
    | "WHITE"
    | "ORANGE"
    | "LIGHT_GREEN"
    | "PURPLE"
    | "YELLOW"
    | "RED"
    | "SKY_BLUE"
    | "BLACK"
    | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  number!: string | null;
}

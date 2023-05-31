import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { LivestockUnit } from "../models/LivestockUnit";
import { VisualIdColour } from "../enums/VisualIdColour";

@TypeGraphQL.ObjectType("VisualId", {
  isAbstract: true,
})
export class VisualId {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  livestockUnit?: LivestockUnit;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitId!: string;

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
    | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  number?: string | null;
}

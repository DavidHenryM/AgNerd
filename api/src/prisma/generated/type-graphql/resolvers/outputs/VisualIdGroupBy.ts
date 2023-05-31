import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdCountAggregate } from "../outputs/VisualIdCountAggregate";
import { VisualIdMaxAggregate } from "../outputs/VisualIdMaxAggregate";
import { VisualIdMinAggregate } from "../outputs/VisualIdMinAggregate";
import { VisualIdColour } from "../../enums/VisualIdColour";

@TypeGraphQL.ObjectType("VisualIdGroupBy", {
  isAbstract: true,
})
export class VisualIdGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitId!: string;

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

  @TypeGraphQL.Field((_type) => VisualIdCountAggregate, {
    nullable: true,
  })
  _count!: VisualIdCountAggregate | null;

  @TypeGraphQL.Field((_type) => VisualIdMinAggregate, {
    nullable: true,
  })
  _min!: VisualIdMinAggregate | null;

  @TypeGraphQL.Field((_type) => VisualIdMaxAggregate, {
    nullable: true,
  })
  _max!: VisualIdMaxAggregate | null;
}

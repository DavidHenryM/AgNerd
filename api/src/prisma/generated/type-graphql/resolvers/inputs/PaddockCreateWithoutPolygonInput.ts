import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateNestedManyWithoutPaddockInput } from "../inputs/GrazeCreateNestedManyWithoutPaddockInput";
import { LivestockUnitPositionCreateNestedOneWithoutPaddockInput } from "../inputs/LivestockUnitPositionCreateNestedOneWithoutPaddockInput";

@TypeGraphQL.InputType("PaddockCreateWithoutPolygonInput", {
  isAbstract: true
})
export class PaddockCreateWithoutPolygonInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  areaHa!: number;

  @TypeGraphQL.Field(_type => GrazeCreateNestedManyWithoutPaddockInput, {
    nullable: true
  })
  graze?: GrazeCreateNestedManyWithoutPaddockInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitPositionCreateNestedOneWithoutPaddockInput, {
    nullable: false
  })
  livestockUnitPosition!: LivestockUnitPositionCreateNestedOneWithoutPaddockInput;
}

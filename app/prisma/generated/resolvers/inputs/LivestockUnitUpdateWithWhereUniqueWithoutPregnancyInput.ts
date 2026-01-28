import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitUpdateWithoutPregnancyInput } from "../inputs/LivestockUnitUpdateWithoutPregnancyInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpdateWithWhereUniqueWithoutPregnancyInput",
  {},
)
export class LivestockUnitUpdateWithWhereUniqueWithoutPregnancyInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutPregnancyInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateWithoutPregnancyInput;
}

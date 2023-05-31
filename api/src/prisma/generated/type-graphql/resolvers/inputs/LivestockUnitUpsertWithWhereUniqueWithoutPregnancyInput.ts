import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutPregnancyInput } from "../inputs/LivestockUnitCreateWithoutPregnancyInput";
import { LivestockUnitUpdateWithoutPregnancyInput } from "../inputs/LivestockUnitUpdateWithoutPregnancyInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpsertWithWhereUniqueWithoutPregnancyInput",
  {
    isAbstract: true,
  }
)
export class LivestockUnitUpsertWithWhereUniqueWithoutPregnancyInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutPregnancyInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutPregnancyInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutPregnancyInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutPregnancyInput;
}

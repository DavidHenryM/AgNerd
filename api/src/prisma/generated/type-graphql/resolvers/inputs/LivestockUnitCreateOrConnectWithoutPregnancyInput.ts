import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutPregnancyInput } from "../inputs/LivestockUnitCreateWithoutPregnancyInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitCreateOrConnectWithoutPregnancyInput", {
  isAbstract: true,
})
export class LivestockUnitCreateOrConnectWithoutPregnancyInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutPregnancyInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutPregnancyInput;
}

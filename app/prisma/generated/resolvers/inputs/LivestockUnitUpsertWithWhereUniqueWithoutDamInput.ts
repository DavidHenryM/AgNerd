import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutDamInput } from "../inputs/LivestockUnitCreateWithoutDamInput";
import { LivestockUnitUpdateWithoutDamInput } from "../inputs/LivestockUnitUpdateWithoutDamInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithWhereUniqueWithoutDamInput", {})
export class LivestockUnitUpsertWithWhereUniqueWithoutDamInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutDamInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutDamInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutDamInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutDamInput;
}

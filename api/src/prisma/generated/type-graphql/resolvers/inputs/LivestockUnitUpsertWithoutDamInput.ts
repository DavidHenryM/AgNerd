import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutDamInput } from "../inputs/LivestockUnitCreateWithoutDamInput";
import { LivestockUnitUpdateWithoutDamInput } from "../inputs/LivestockUnitUpdateWithoutDamInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutDamInput", {
  isAbstract: true,
})
export class LivestockUnitUpsertWithoutDamInput {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutDamInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutDamInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutDamInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutDamInput;
}

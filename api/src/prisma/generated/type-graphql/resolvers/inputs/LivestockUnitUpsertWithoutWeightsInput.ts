import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutWeightsInput } from "../inputs/LivestockUnitCreateWithoutWeightsInput";
import { LivestockUnitUpdateWithoutWeightsInput } from "../inputs/LivestockUnitUpdateWithoutWeightsInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutWeightsInput", {
  isAbstract: true,
})
export class LivestockUnitUpsertWithoutWeightsInput {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutWeightsInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutWeightsInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutWeightsInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutWeightsInput;
}

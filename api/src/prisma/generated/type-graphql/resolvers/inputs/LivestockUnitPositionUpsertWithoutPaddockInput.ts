import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionCreateWithoutPaddockInput } from "../inputs/LivestockUnitPositionCreateWithoutPaddockInput";
import { LivestockUnitPositionUpdateWithoutPaddockInput } from "../inputs/LivestockUnitPositionUpdateWithoutPaddockInput";

@TypeGraphQL.InputType("LivestockUnitPositionUpsertWithoutPaddockInput", {
  isAbstract: true
})
export class LivestockUnitPositionUpsertWithoutPaddockInput {
  @TypeGraphQL.Field(_type => LivestockUnitPositionUpdateWithoutPaddockInput, {
    nullable: false
  })
  update!: LivestockUnitPositionUpdateWithoutPaddockInput;

  @TypeGraphQL.Field(_type => LivestockUnitPositionCreateWithoutPaddockInput, {
    nullable: false
  })
  create!: LivestockUnitPositionCreateWithoutPaddockInput;
}

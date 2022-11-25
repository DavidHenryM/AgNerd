import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutSireInput } from "../inputs/LivestockUnitCreateWithoutSireInput";
import { LivestockUnitUpdateWithoutSireInput } from "../inputs/LivestockUnitUpdateWithoutSireInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutSireInput", {
  isAbstract: true
})
export class LivestockUnitUpsertWithoutSireInput {
  @TypeGraphQL.Field(_type => LivestockUnitUpdateWithoutSireInput, {
    nullable: false
  })
  update!: LivestockUnitUpdateWithoutSireInput;

  @TypeGraphQL.Field(_type => LivestockUnitCreateWithoutSireInput, {
    nullable: false
  })
  create!: LivestockUnitCreateWithoutSireInput;
}

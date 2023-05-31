import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutVisualidInput } from "../inputs/LivestockUnitCreateWithoutVisualidInput";
import { LivestockUnitUpdateWithoutVisualidInput } from "../inputs/LivestockUnitUpdateWithoutVisualidInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutVisualidInput", {
  isAbstract: true,
})
export class LivestockUnitUpsertWithoutVisualidInput {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutVisualidInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutVisualidInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutVisualidInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutVisualidInput;
}

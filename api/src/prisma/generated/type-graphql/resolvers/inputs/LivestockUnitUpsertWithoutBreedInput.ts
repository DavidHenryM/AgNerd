import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutBreedInput } from "../inputs/LivestockUnitCreateWithoutBreedInput";
import { LivestockUnitUpdateWithoutBreedInput } from "../inputs/LivestockUnitUpdateWithoutBreedInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutBreedInput", {
  isAbstract: true,
})
export class LivestockUnitUpsertWithoutBreedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutBreedInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutBreedInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutBreedInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutBreedInput;
}

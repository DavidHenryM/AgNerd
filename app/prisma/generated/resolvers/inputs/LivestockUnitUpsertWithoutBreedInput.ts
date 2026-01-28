import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutBreedInput } from "../inputs/LivestockUnitCreateWithoutBreedInput";
import { LivestockUnitUpdateWithoutBreedInput } from "../inputs/LivestockUnitUpdateWithoutBreedInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType("LivestockUnitUpsertWithoutBreedInput", {})
export class LivestockUnitUpsertWithoutBreedInput {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateWithoutBreedInput, {
    nullable: false,
  })
  update!: LivestockUnitUpdateWithoutBreedInput;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateWithoutBreedInput, {
    nullable: false,
  })
  create!: LivestockUnitCreateWithoutBreedInput;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;
}

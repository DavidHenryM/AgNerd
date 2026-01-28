import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitCreateWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitUpdateWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitUpdateWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpsertWithoutEstimatedBreedingValueResultInput",
  {},
)
export class LivestockUnitUpsertWithoutEstimatedBreedingValueResultInput {
  @TypeGraphQL.Field(
    (_type) => LivestockUnitUpdateWithoutEstimatedBreedingValueResultInput,
    {
      nullable: false,
    },
  )
  update!: LivestockUnitUpdateWithoutEstimatedBreedingValueResultInput;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateWithoutEstimatedBreedingValueResultInput,
    {
      nullable: false,
    },
  )
  create!: LivestockUnitCreateWithoutEstimatedBreedingValueResultInput;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;
}

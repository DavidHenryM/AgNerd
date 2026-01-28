import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitCreateWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitCreateOrConnectWithoutEstimatedBreedingValueResultInput",
  {},
)
export class LivestockUnitCreateOrConnectWithoutEstimatedBreedingValueResultInput {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateWithoutEstimatedBreedingValueResultInput,
    {
      nullable: false,
    },
  )
  create!: LivestockUnitCreateWithoutEstimatedBreedingValueResultInput;
}

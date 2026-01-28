import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitCreateOrConnectWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitCreateWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitCreateWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitCreateNestedOneWithoutEstimatedBreedingValueResultInput",
  {},
)
export class LivestockUnitCreateNestedOneWithoutEstimatedBreedingValueResultInput {
  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateWithoutEstimatedBreedingValueResultInput,
    {
      nullable: true,
    },
  )
  create?:
    | LivestockUnitCreateWithoutEstimatedBreedingValueResultInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      LivestockUnitCreateOrConnectWithoutEstimatedBreedingValueResultInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | LivestockUnitCreateOrConnectWithoutEstimatedBreedingValueResultInput
    | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;
}

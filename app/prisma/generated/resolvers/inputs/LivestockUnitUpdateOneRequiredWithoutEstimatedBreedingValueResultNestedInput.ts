import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitCreateOrConnectWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitCreateWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitCreateWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitUpdateToOneWithWhereWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitUpdateToOneWithWhereWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitUpsertWithoutEstimatedBreedingValueResultInput } from "../inputs/LivestockUnitUpsertWithoutEstimatedBreedingValueResultInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType(
  "LivestockUnitUpdateOneRequiredWithoutEstimatedBreedingValueResultNestedInput",
  {},
)
export class LivestockUnitUpdateOneRequiredWithoutEstimatedBreedingValueResultNestedInput {
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

  @TypeGraphQL.Field(
    (_type) => LivestockUnitUpsertWithoutEstimatedBreedingValueResultInput,
    {
      nullable: true,
    },
  )
  upsert?:
    | LivestockUnitUpsertWithoutEstimatedBreedingValueResultInput
    | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      LivestockUnitUpdateToOneWithWhereWithoutEstimatedBreedingValueResultInput,
    {
      nullable: true,
    },
  )
  update?:
    | LivestockUnitUpdateToOneWithWhereWithoutEstimatedBreedingValueResultInput
    | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateManyLivestockUnitInputEnvelope } from "../inputs/EstimatedBreedingValueResultCreateManyLivestockUnitInputEnvelope";
import { EstimatedBreedingValueResultCreateOrConnectWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultCreateOrConnectWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultCreateWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultCreateWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultCreateNestedManyWithoutLivestockUnitInput",
  {},
)
export class EstimatedBreedingValueResultCreateNestedManyWithoutLivestockUnitInput {
  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultCreateWithoutLivestockUnitInput],
    {
      nullable: true,
    },
  )
  create?:
    | EstimatedBreedingValueResultCreateWithoutLivestockUnitInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [
      EstimatedBreedingValueResultCreateOrConnectWithoutLivestockUnitInput,
    ],
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | EstimatedBreedingValueResultCreateOrConnectWithoutLivestockUnitInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultCreateManyLivestockUnitInputEnvelope,
    {
      nullable: true,
    },
  )
  createMany?:
    | EstimatedBreedingValueResultCreateManyLivestockUnitInputEnvelope
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultWhereUniqueInput],
    {
      nullable: true,
    },
  )
  connect?: EstimatedBreedingValueResultWhereUniqueInput[] | undefined;
}

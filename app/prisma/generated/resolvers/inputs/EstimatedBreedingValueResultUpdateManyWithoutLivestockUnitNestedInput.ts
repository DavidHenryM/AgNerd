import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateManyLivestockUnitInputEnvelope } from "../inputs/EstimatedBreedingValueResultCreateManyLivestockUnitInputEnvelope";
import { EstimatedBreedingValueResultCreateOrConnectWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultCreateOrConnectWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultCreateWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultCreateWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultScalarWhereInput } from "../inputs/EstimatedBreedingValueResultScalarWhereInput";
import { EstimatedBreedingValueResultUpdateManyWithWhereWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultUpdateManyWithWhereWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutLivestockUnitInput } from "../inputs/EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutLivestockUnitInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultUpdateManyWithoutLivestockUnitNestedInput",
  {},
)
export class EstimatedBreedingValueResultUpdateManyWithoutLivestockUnitNestedInput {
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
    (_type) => [
      EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutLivestockUnitInput,
    ],
    {
      nullable: true,
    },
  )
  upsert?:
    | EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutLivestockUnitInput[]
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
  set?: EstimatedBreedingValueResultWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultWhereUniqueInput],
    {
      nullable: true,
    },
  )
  disconnect?: EstimatedBreedingValueResultWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultWhereUniqueInput],
    {
      nullable: true,
    },
  )
  delete?: EstimatedBreedingValueResultWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultWhereUniqueInput],
    {
      nullable: true,
    },
  )
  connect?: EstimatedBreedingValueResultWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [
      EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutLivestockUnitInput,
    ],
    {
      nullable: true,
    },
  )
  update?:
    | EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutLivestockUnitInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [
      EstimatedBreedingValueResultUpdateManyWithWhereWithoutLivestockUnitInput,
    ],
    {
      nullable: true,
    },
  )
  updateMany?:
    | EstimatedBreedingValueResultUpdateManyWithWhereWithoutLivestockUnitInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultScalarWhereInput],
    {
      nullable: true,
    },
  )
  deleteMany?: EstimatedBreedingValueResultScalarWhereInput[] | undefined;
}

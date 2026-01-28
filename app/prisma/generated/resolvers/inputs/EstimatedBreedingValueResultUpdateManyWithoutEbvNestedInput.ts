import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateManyEbvInputEnvelope } from "../inputs/EstimatedBreedingValueResultCreateManyEbvInputEnvelope";
import { EstimatedBreedingValueResultCreateOrConnectWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultCreateOrConnectWithoutEbvInput";
import { EstimatedBreedingValueResultCreateWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultCreateWithoutEbvInput";
import { EstimatedBreedingValueResultScalarWhereInput } from "../inputs/EstimatedBreedingValueResultScalarWhereInput";
import { EstimatedBreedingValueResultUpdateManyWithWhereWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultUpdateManyWithWhereWithoutEbvInput";
import { EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutEbvInput";
import { EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutEbvInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultUpdateManyWithoutEbvNestedInput",
  {},
)
export class EstimatedBreedingValueResultUpdateManyWithoutEbvNestedInput {
  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultCreateWithoutEbvInput],
    {
      nullable: true,
    },
  )
  create?: EstimatedBreedingValueResultCreateWithoutEbvInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultCreateOrConnectWithoutEbvInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | EstimatedBreedingValueResultCreateOrConnectWithoutEbvInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [
      EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutEbvInput,
    ],
    {
      nullable: true,
    },
  )
  upsert?:
    | EstimatedBreedingValueResultUpsertWithWhereUniqueWithoutEbvInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultCreateManyEbvInputEnvelope,
    {
      nullable: true,
    },
  )
  createMany?:
    | EstimatedBreedingValueResultCreateManyEbvInputEnvelope
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
      EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutEbvInput,
    ],
    {
      nullable: true,
    },
  )
  update?:
    | EstimatedBreedingValueResultUpdateWithWhereUniqueWithoutEbvInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultUpdateManyWithWhereWithoutEbvInput],
    {
      nullable: true,
    },
  )
  updateMany?:
    | EstimatedBreedingValueResultUpdateManyWithWhereWithoutEbvInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultScalarWhereInput],
    {
      nullable: true,
    },
  )
  deleteMany?: EstimatedBreedingValueResultScalarWhereInput[] | undefined;
}

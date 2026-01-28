import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultCreateManyEbvInputEnvelope } from "../inputs/EstimatedBreedingValueResultCreateManyEbvInputEnvelope";
import { EstimatedBreedingValueResultCreateOrConnectWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultCreateOrConnectWithoutEbvInput";
import { EstimatedBreedingValueResultCreateWithoutEbvInput } from "../inputs/EstimatedBreedingValueResultCreateWithoutEbvInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultCreateNestedManyWithoutEbvInput",
  {},
)
export class EstimatedBreedingValueResultCreateNestedManyWithoutEbvInput {
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
  connect?: EstimatedBreedingValueResultWhereUniqueInput[] | undefined;
}

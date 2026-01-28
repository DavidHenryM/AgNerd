import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionCreateOrConnectWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionCreateOrConnectWithoutResultsInput";
import { EstimatedBreedingValueDefinitionCreateWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionCreateWithoutResultsInput";
import { EstimatedBreedingValueDefinitionUpdateToOneWithWhereWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionUpdateToOneWithWhereWithoutResultsInput";
import { EstimatedBreedingValueDefinitionUpsertWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionUpsertWithoutResultsInput";
import { EstimatedBreedingValueDefinitionWhereUniqueInput } from "../inputs/EstimatedBreedingValueDefinitionWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionUpdateOneRequiredWithoutResultsNestedInput",
  {},
)
export class EstimatedBreedingValueDefinitionUpdateOneRequiredWithoutResultsNestedInput {
  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionCreateWithoutResultsInput,
    {
      nullable: true,
    },
  )
  create?:
    | EstimatedBreedingValueDefinitionCreateWithoutResultsInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      EstimatedBreedingValueDefinitionCreateOrConnectWithoutResultsInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | EstimatedBreedingValueDefinitionCreateOrConnectWithoutResultsInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionUpsertWithoutResultsInput,
    {
      nullable: true,
    },
  )
  upsert?:
    | EstimatedBreedingValueDefinitionUpsertWithoutResultsInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionWhereUniqueInput,
    {
      nullable: true,
    },
  )
  connect?: EstimatedBreedingValueDefinitionWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) =>
      EstimatedBreedingValueDefinitionUpdateToOneWithWhereWithoutResultsInput,
    {
      nullable: true,
    },
  )
  update?:
    | EstimatedBreedingValueDefinitionUpdateToOneWithWhereWithoutResultsInput
    | undefined;
}

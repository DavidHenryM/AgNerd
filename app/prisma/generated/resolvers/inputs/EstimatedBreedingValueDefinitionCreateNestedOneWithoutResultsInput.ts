import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionCreateOrConnectWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionCreateOrConnectWithoutResultsInput";
import { EstimatedBreedingValueDefinitionCreateWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionCreateWithoutResultsInput";
import { EstimatedBreedingValueDefinitionWhereUniqueInput } from "../inputs/EstimatedBreedingValueDefinitionWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionCreateNestedOneWithoutResultsInput",
  {},
)
export class EstimatedBreedingValueDefinitionCreateNestedOneWithoutResultsInput {
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
    (_type) => EstimatedBreedingValueDefinitionWhereUniqueInput,
    {
      nullable: true,
    },
  )
  connect?: EstimatedBreedingValueDefinitionWhereUniqueInput | undefined;
}

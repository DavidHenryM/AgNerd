import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionCreateWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionCreateWithoutResultsInput";
import { EstimatedBreedingValueDefinitionWhereUniqueInput } from "../inputs/EstimatedBreedingValueDefinitionWhereUniqueInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionCreateOrConnectWithoutResultsInput",
  {},
)
export class EstimatedBreedingValueDefinitionCreateOrConnectWithoutResultsInput {
  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionWhereUniqueInput,
    {
      nullable: false,
    },
  )
  where!: EstimatedBreedingValueDefinitionWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionCreateWithoutResultsInput,
    {
      nullable: false,
    },
  )
  create!: EstimatedBreedingValueDefinitionCreateWithoutResultsInput;
}

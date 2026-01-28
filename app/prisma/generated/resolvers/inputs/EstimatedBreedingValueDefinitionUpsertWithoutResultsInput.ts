import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionCreateWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionCreateWithoutResultsInput";
import { EstimatedBreedingValueDefinitionUpdateWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionUpdateWithoutResultsInput";
import { EstimatedBreedingValueDefinitionWhereInput } from "../inputs/EstimatedBreedingValueDefinitionWhereInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionUpsertWithoutResultsInput",
  {},
)
export class EstimatedBreedingValueDefinitionUpsertWithoutResultsInput {
  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionUpdateWithoutResultsInput,
    {
      nullable: false,
    },
  )
  update!: EstimatedBreedingValueDefinitionUpdateWithoutResultsInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionCreateWithoutResultsInput,
    {
      nullable: false,
    },
  )
  create!: EstimatedBreedingValueDefinitionCreateWithoutResultsInput;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueDefinitionWhereInput | undefined;
}

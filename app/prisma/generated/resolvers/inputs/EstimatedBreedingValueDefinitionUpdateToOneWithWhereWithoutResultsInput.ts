import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionUpdateWithoutResultsInput } from "../inputs/EstimatedBreedingValueDefinitionUpdateWithoutResultsInput";
import { EstimatedBreedingValueDefinitionWhereInput } from "../inputs/EstimatedBreedingValueDefinitionWhereInput";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionUpdateToOneWithWhereWithoutResultsInput",
  {},
)
export class EstimatedBreedingValueDefinitionUpdateToOneWithWhereWithoutResultsInput {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueDefinitionWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionUpdateWithoutResultsInput,
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueDefinitionUpdateWithoutResultsInput;
}

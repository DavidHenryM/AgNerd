import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionCreateManyInput } from "../../../inputs/EstimatedBreedingValueDefinitionCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyEstimatedBreedingValueDefinitionArgs {
  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueDefinitionCreateManyInput],
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueDefinitionCreateManyInput[];
}

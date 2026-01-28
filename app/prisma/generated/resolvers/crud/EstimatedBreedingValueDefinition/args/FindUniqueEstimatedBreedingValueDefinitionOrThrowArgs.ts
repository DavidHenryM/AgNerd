import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueDefinitionWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueEstimatedBreedingValueDefinitionOrThrowArgs {
  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionWhereUniqueInput,
    {
      nullable: false,
    },
  )
  where!: EstimatedBreedingValueDefinitionWhereUniqueInput;
}

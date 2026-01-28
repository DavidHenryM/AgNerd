import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionCreateInput } from "../../../inputs/EstimatedBreedingValueDefinitionCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneEstimatedBreedingValueDefinitionArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionCreateInput, {
    nullable: false,
  })
  data!: EstimatedBreedingValueDefinitionCreateInput;
}

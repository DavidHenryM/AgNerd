import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionCreateInput } from "../../../inputs/EstimatedBreedingValueDefinitionCreateInput";
import { EstimatedBreedingValueDefinitionUpdateInput } from "../../../inputs/EstimatedBreedingValueDefinitionUpdateInput";
import { EstimatedBreedingValueDefinitionWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueDefinitionWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneEstimatedBreedingValueDefinitionArgs {
  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionWhereUniqueInput,
    {
      nullable: false,
    },
  )
  where!: EstimatedBreedingValueDefinitionWhereUniqueInput;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionCreateInput, {
    nullable: false,
  })
  create!: EstimatedBreedingValueDefinitionCreateInput;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionUpdateInput, {
    nullable: false,
  })
  update!: EstimatedBreedingValueDefinitionUpdateInput;
}

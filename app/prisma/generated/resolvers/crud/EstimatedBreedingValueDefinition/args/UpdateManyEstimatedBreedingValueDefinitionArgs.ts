import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionUpdateManyMutationInput } from "../../../inputs/EstimatedBreedingValueDefinitionUpdateManyMutationInput";
import { EstimatedBreedingValueDefinitionWhereInput } from "../../../inputs/EstimatedBreedingValueDefinitionWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyEstimatedBreedingValueDefinitionArgs {
  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionUpdateManyMutationInput,
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueDefinitionUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueDefinitionWhereInput | undefined;
}

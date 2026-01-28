import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionUpdateInput } from "../../../inputs/EstimatedBreedingValueDefinitionUpdateInput";
import { EstimatedBreedingValueDefinitionWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueDefinitionWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneEstimatedBreedingValueDefinitionArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionUpdateInput, {
    nullable: false,
  })
  data!: EstimatedBreedingValueDefinitionUpdateInput;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionWhereUniqueInput,
    {
      nullable: false,
    },
  )
  where!: EstimatedBreedingValueDefinitionWhereUniqueInput;
}

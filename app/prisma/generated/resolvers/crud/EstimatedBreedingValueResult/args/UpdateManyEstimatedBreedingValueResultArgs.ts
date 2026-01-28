import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultUpdateManyMutationInput } from "../../../inputs/EstimatedBreedingValueResultUpdateManyMutationInput";
import { EstimatedBreedingValueResultWhereInput } from "../../../inputs/EstimatedBreedingValueResultWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyEstimatedBreedingValueResultArgs {
  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultUpdateManyMutationInput,
    {
      nullable: false,
    },
  )
  data!: EstimatedBreedingValueResultUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueResultWhereInput | undefined;
}

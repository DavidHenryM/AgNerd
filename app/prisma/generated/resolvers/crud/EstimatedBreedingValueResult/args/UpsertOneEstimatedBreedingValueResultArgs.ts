import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultCreateInput } from "../../../inputs/EstimatedBreedingValueResultCreateInput";
import { EstimatedBreedingValueResultUpdateInput } from "../../../inputs/EstimatedBreedingValueResultUpdateInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneEstimatedBreedingValueResultArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: false,
  })
  where!: EstimatedBreedingValueResultWhereUniqueInput;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultCreateInput, {
    nullable: false,
  })
  create!: EstimatedBreedingValueResultCreateInput;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultUpdateInput, {
    nullable: false,
  })
  update!: EstimatedBreedingValueResultUpdateInput;
}

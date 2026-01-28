import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultCreateInput } from "../../../inputs/EstimatedBreedingValueResultCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneEstimatedBreedingValueResultArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultCreateInput, {
    nullable: false,
  })
  data!: EstimatedBreedingValueResultCreateInput;
}

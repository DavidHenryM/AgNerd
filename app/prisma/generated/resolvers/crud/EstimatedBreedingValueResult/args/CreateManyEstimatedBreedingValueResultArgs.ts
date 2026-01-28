import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultCreateManyInput } from "../../../inputs/EstimatedBreedingValueResultCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyEstimatedBreedingValueResultArgs {
  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueResultCreateManyInput], {
    nullable: false,
  })
  data!: EstimatedBreedingValueResultCreateManyInput[];
}

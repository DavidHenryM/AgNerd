import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultUpdateInput } from "../../../inputs/EstimatedBreedingValueResultUpdateInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneEstimatedBreedingValueResultArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultUpdateInput, {
    nullable: false,
  })
  data!: EstimatedBreedingValueResultUpdateInput;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: false,
  })
  where!: EstimatedBreedingValueResultWhereUniqueInput;
}

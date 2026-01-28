import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultWhereInput } from "../../inputs/EstimatedBreedingValueResultWhereInput";

@TypeGraphQL.ArgsType()
export class EstimatedBreedingValueDefinitionCountResultsArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueResultWhereInput | undefined;
}

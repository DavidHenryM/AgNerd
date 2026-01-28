import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionWhereInput } from "../../../inputs/EstimatedBreedingValueDefinitionWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyEstimatedBreedingValueDefinitionArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueDefinitionWhereInput | undefined;
}

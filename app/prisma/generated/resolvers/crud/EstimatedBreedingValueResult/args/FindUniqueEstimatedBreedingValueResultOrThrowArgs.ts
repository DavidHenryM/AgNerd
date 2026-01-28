import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueEstimatedBreedingValueResultOrThrowArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: false,
  })
  where!: EstimatedBreedingValueResultWhereUniqueInput;
}

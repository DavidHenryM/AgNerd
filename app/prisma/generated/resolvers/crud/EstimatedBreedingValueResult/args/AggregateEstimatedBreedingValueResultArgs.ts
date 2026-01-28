import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultOrderByWithRelationInput } from "../../../inputs/EstimatedBreedingValueResultOrderByWithRelationInput";
import { EstimatedBreedingValueResultWhereInput } from "../../../inputs/EstimatedBreedingValueResultWhereInput";
import { EstimatedBreedingValueResultWhereUniqueInput } from "../../../inputs/EstimatedBreedingValueResultWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateEstimatedBreedingValueResultArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueResultWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultOrderByWithRelationInput],
    {
      nullable: true,
    },
  )
  orderBy?: EstimatedBreedingValueResultOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereUniqueInput, {
    nullable: true,
  })
  cursor?: EstimatedBreedingValueResultWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

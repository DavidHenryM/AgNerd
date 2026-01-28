import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueResultOrderByWithAggregationInput } from "../../../inputs/EstimatedBreedingValueResultOrderByWithAggregationInput";
import { EstimatedBreedingValueResultScalarWhereWithAggregatesInput } from "../../../inputs/EstimatedBreedingValueResultScalarWhereWithAggregatesInput";
import { EstimatedBreedingValueResultWhereInput } from "../../../inputs/EstimatedBreedingValueResultWhereInput";
import { EstimatedBreedingValueResultScalarFieldEnum } from "../../../../enums/EstimatedBreedingValueResultScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByEstimatedBreedingValueResultArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueResultWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultOrderByWithAggregationInput],
    {
      nullable: true,
    },
  )
  orderBy?:
    | EstimatedBreedingValueResultOrderByWithAggregationInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueResultScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    | "id"
    | "estimatedBreedingValueDefinitionId"
    | "value"
    | "percentile"
    | "accuracy"
    | "livestockUnitId"
  >;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultScalarWhereWithAggregatesInput,
    {
      nullable: true,
    },
  )
  having?:
    | EstimatedBreedingValueResultScalarWhereWithAggregatesInput
    | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

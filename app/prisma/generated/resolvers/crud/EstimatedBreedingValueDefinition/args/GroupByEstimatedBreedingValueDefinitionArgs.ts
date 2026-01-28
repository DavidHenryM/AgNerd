import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EstimatedBreedingValueDefinitionOrderByWithAggregationInput } from "../../../inputs/EstimatedBreedingValueDefinitionOrderByWithAggregationInput";
import { EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput } from "../../../inputs/EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput";
import { EstimatedBreedingValueDefinitionWhereInput } from "../../../inputs/EstimatedBreedingValueDefinitionWhereInput";
import { EstimatedBreedingValueDefinitionScalarFieldEnum } from "../../../../enums/EstimatedBreedingValueDefinitionScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByEstimatedBreedingValueDefinitionArgs {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionWhereInput, {
    nullable: true,
  })
  where?: EstimatedBreedingValueDefinitionWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueDefinitionOrderByWithAggregationInput],
    {
      nullable: true,
    },
  )
  orderBy?:
    | EstimatedBreedingValueDefinitionOrderByWithAggregationInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueDefinitionScalarFieldEnum],
    {
      nullable: false,
    },
  )
  by!: Array<
    | "id"
    | "name"
    | "code"
    | "category"
    | "description"
    | "higherIsBetter"
    | "units"
    | "measurement"
    | "angusTechFieldNameValue"
    | "angusTechFieldNamePercentile"
    | "angusTechFieldNameAccuracy"
  >;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput,
    {
      nullable: true,
    },
  )
  having?:
    | EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput
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

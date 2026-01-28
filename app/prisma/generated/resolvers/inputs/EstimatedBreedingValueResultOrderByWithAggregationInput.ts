import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultAvgOrderByAggregateInput } from "../inputs/EstimatedBreedingValueResultAvgOrderByAggregateInput";
import { EstimatedBreedingValueResultCountOrderByAggregateInput } from "../inputs/EstimatedBreedingValueResultCountOrderByAggregateInput";
import { EstimatedBreedingValueResultMaxOrderByAggregateInput } from "../inputs/EstimatedBreedingValueResultMaxOrderByAggregateInput";
import { EstimatedBreedingValueResultMinOrderByAggregateInput } from "../inputs/EstimatedBreedingValueResultMinOrderByAggregateInput";
import { EstimatedBreedingValueResultSumOrderByAggregateInput } from "../inputs/EstimatedBreedingValueResultSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultOrderByWithAggregationInput",
  {},
)
export class EstimatedBreedingValueResultOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  estimatedBreedingValueDefinitionId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  value?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  percentile?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  accuracy?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  livestockUnitId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultCountOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _count?: EstimatedBreedingValueResultCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultAvgOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _avg?: EstimatedBreedingValueResultAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultMaxOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _max?: EstimatedBreedingValueResultMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultMinOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _min?: EstimatedBreedingValueResultMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultSumOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _sum?: EstimatedBreedingValueResultSumOrderByAggregateInput | undefined;
}

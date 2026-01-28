import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionCountOrderByAggregateInput } from "../inputs/EstimatedBreedingValueDefinitionCountOrderByAggregateInput";
import { EstimatedBreedingValueDefinitionMaxOrderByAggregateInput } from "../inputs/EstimatedBreedingValueDefinitionMaxOrderByAggregateInput";
import { EstimatedBreedingValueDefinitionMinOrderByAggregateInput } from "../inputs/EstimatedBreedingValueDefinitionMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionOrderByWithAggregationInput",
  {},
)
export class EstimatedBreedingValueDefinitionOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  code?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  category?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  description?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  higherIsBetter?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  units?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  measurement?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  angusTechFieldNameValue?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  angusTechFieldNamePercentile?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  angusTechFieldNameAccuracy?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionCountOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _count?:
    | EstimatedBreedingValueDefinitionCountOrderByAggregateInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionMaxOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _max?: EstimatedBreedingValueDefinitionMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionMinOrderByAggregateInput,
    {
      nullable: true,
    },
  )
  _min?: EstimatedBreedingValueDefinitionMinOrderByAggregateInput | undefined;
}

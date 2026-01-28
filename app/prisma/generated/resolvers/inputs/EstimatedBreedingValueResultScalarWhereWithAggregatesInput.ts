import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatWithAggregatesFilter } from "../inputs/FloatWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultScalarWhereWithAggregatesInput",
  {},
)
export class EstimatedBreedingValueResultScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  AND?:
    | EstimatedBreedingValueResultScalarWhereWithAggregatesInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  OR?: EstimatedBreedingValueResultScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  NOT?:
    | EstimatedBreedingValueResultScalarWhereWithAggregatesInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  estimatedBreedingValueDefinitionId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatWithAggregatesFilter, {
    nullable: true,
  })
  value?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatWithAggregatesFilter, {
    nullable: true,
  })
  percentile?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatWithAggregatesFilter, {
    nullable: true,
  })
  accuracy?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  livestockUnitId?: StringWithAggregatesFilter | undefined;
}

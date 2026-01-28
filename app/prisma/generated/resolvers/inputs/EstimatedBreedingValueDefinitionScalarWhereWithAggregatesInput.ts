import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolWithAggregatesFilter } from "../inputs/BoolWithAggregatesFilter";
import { EnumEbvCategoryWithAggregatesFilter } from "../inputs/EnumEbvCategoryWithAggregatesFilter";
import { EnumMeasurementWithAggregatesFilter } from "../inputs/EnumMeasurementWithAggregatesFilter";
import { EnumUnitsWithAggregatesFilter } from "../inputs/EnumUnitsWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput",
  {},
)
export class EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  AND?:
    | EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  OR?:
    | EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput],
    {
      nullable: true,
    },
  )
  NOT?:
    | EstimatedBreedingValueDefinitionScalarWhereWithAggregatesInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  name?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  code?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumEbvCategoryWithAggregatesFilter, {
    nullable: true,
  })
  category?: EnumEbvCategoryWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  description?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolWithAggregatesFilter, {
    nullable: true,
  })
  higherIsBetter?: BoolWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumUnitsWithAggregatesFilter, {
    nullable: true,
  })
  units?: EnumUnitsWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumMeasurementWithAggregatesFilter, {
    nullable: true,
  })
  measurement?: EnumMeasurementWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  angusTechFieldNameValue?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  angusTechFieldNamePercentile?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  angusTechFieldNameAccuracy?: StringNullableWithAggregatesFilter | undefined;
}

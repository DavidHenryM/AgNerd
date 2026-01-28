import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { EnumEbvCategoryFilter } from "../inputs/EnumEbvCategoryFilter";
import { EnumMeasurementFilter } from "../inputs/EnumMeasurementFilter";
import { EnumUnitsFilter } from "../inputs/EnumUnitsFilter";
import { EstimatedBreedingValueDefinitionWhereInput } from "../inputs/EstimatedBreedingValueDefinitionWhereInput";
import { EstimatedBreedingValueResultListRelationFilter } from "../inputs/EstimatedBreedingValueResultListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("EstimatedBreedingValueDefinitionWhereUniqueInput", {})
export class EstimatedBreedingValueDefinitionWhereUniqueInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueDefinitionWhereInput], {
    nullable: true,
  })
  AND?: EstimatedBreedingValueDefinitionWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueDefinitionWhereInput], {
    nullable: true,
  })
  OR?: EstimatedBreedingValueDefinitionWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueDefinitionWhereInput], {
    nullable: true,
  })
  NOT?: EstimatedBreedingValueDefinitionWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  code?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumEbvCategoryFilter, {
    nullable: true,
  })
  category?: EnumEbvCategoryFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  description?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolFilter, {
    nullable: true,
  })
  higherIsBetter?: BoolFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumUnitsFilter, {
    nullable: true,
  })
  units?: EnumUnitsFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumMeasurementFilter, {
    nullable: true,
  })
  measurement?: EnumMeasurementFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  angusTechFieldNameValue?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  angusTechFieldNamePercentile?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  angusTechFieldNameAccuracy?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultListRelationFilter,
    {
      nullable: true,
    },
  )
  results?: EstimatedBreedingValueResultListRelationFilter | undefined;
}

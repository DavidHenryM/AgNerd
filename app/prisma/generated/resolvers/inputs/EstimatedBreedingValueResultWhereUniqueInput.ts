import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionRelationFilter } from "../inputs/EstimatedBreedingValueDefinitionRelationFilter";
import { EstimatedBreedingValueResultWhereInput } from "../inputs/EstimatedBreedingValueResultWhereInput";
import { FloatFilter } from "../inputs/FloatFilter";
import { LivestockUnitRelationFilter } from "../inputs/LivestockUnitRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("EstimatedBreedingValueResultWhereUniqueInput", {})
export class EstimatedBreedingValueResultWhereUniqueInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueResultWhereInput], {
    nullable: true,
  })
  AND?: EstimatedBreedingValueResultWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueResultWhereInput], {
    nullable: true,
  })
  OR?: EstimatedBreedingValueResultWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [EstimatedBreedingValueResultWhereInput], {
    nullable: true,
  })
  NOT?: EstimatedBreedingValueResultWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  estimatedBreedingValueDefinitionId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  value?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  percentile?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatFilter, {
    nullable: true,
  })
  accuracy?: FloatFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  livestockUnitId?: StringFilter | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionRelationFilter,
    {
      nullable: true,
    },
  )
  ebv?: EstimatedBreedingValueDefinitionRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitRelationFilter, {
    nullable: true,
  })
  livestockUnit?: LivestockUnitRelationFilter | undefined;
}

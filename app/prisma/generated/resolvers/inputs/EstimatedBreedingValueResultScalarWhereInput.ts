import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatFilter } from "../inputs/FloatFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("EstimatedBreedingValueResultScalarWhereInput", {})
export class EstimatedBreedingValueResultScalarWhereInput {
  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultScalarWhereInput],
    {
      nullable: true,
    },
  )
  AND?: EstimatedBreedingValueResultScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultScalarWhereInput],
    {
      nullable: true,
    },
  )
  OR?: EstimatedBreedingValueResultScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [EstimatedBreedingValueResultScalarWhereInput],
    {
      nullable: true,
    },
  )
  NOT?: EstimatedBreedingValueResultScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

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
}

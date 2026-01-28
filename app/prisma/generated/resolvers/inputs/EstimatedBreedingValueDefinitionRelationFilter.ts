import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionWhereInput } from "../inputs/EstimatedBreedingValueDefinitionWhereInput";

@TypeGraphQL.InputType("EstimatedBreedingValueDefinitionRelationFilter", {})
export class EstimatedBreedingValueDefinitionRelationFilter {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionWhereInput, {
    nullable: true,
  })
  is?: EstimatedBreedingValueDefinitionWhereInput | undefined;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionWhereInput, {
    nullable: true,
  })
  isNot?: EstimatedBreedingValueDefinitionWhereInput | undefined;
}

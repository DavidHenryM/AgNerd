import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumStockClassWithAggregatesFilter } from "../inputs/EnumStockClassWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("BreedScalarWhereWithAggregatesInput", {})
export class BreedScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [BreedScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: BreedScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [BreedScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: BreedScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [BreedScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: BreedScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  name?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumStockClassWithAggregatesFilter, {
    nullable: true,
  })
  class?: EnumStockClassWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  livestockUnitId?: StringWithAggregatesFilter | undefined;
}

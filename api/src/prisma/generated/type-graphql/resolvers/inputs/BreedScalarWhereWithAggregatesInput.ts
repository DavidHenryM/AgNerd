import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumStockClassWithAggregatesFilter } from "../inputs/EnumStockClassWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("BreedScalarWhereWithAggregatesInput", {
  isAbstract: true,
})
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

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
  livestockUnitId?: StringNullableWithAggregatesFilter | undefined;
}

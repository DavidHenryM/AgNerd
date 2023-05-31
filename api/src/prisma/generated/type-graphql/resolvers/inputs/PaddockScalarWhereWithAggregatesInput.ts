import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatWithAggregatesFilter } from "../inputs/FloatWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("PaddockScalarWhereWithAggregatesInput", {
  isAbstract: true,
})
export class PaddockScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [PaddockScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: PaddockScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PaddockScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: PaddockScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PaddockScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: PaddockScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  name?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatWithAggregatesFilter, {
    nullable: true,
  })
  areaHa?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  livestockUnitPositionId?: StringWithAggregatesFilter | undefined;
}

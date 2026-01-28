import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("VerificationScalarWhereWithAggregatesInput", {})
export class VerificationScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [VerificationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  AND?: VerificationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [VerificationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  OR?: VerificationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [VerificationScalarWhereWithAggregatesInput], {
    nullable: true,
  })
  NOT?: VerificationScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  identifier?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  value?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  expiresAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeWithAggregatesFilter, {
    nullable: true,
  })
  updatedAt?: DateTimeWithAggregatesFilter | undefined;
}

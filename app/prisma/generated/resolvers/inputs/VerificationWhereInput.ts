import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("VerificationWhereInput", {})
export class VerificationWhereInput {
  @TypeGraphQL.Field((_type) => [VerificationWhereInput], {
    nullable: true,
  })
  AND?: VerificationWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [VerificationWhereInput], {
    nullable: true,
  })
  OR?: VerificationWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [VerificationWhereInput], {
    nullable: true,
  })
  NOT?: VerificationWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  identifier?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  value?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  expiresAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  updatedAt?: DateTimeFilter | undefined;
}

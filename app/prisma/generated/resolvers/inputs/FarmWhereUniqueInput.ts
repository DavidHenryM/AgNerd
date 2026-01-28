import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmWhereInput } from "../inputs/FarmWhereInput";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { UserListRelationFilter } from "../inputs/UserListRelationFilter";

@TypeGraphQL.InputType("FarmWhereUniqueInput", {})
export class FarmWhereUniqueInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => [FarmWhereInput], {
    nullable: true,
  })
  AND?: FarmWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [FarmWhereInput], {
    nullable: true,
  })
  OR?: FarmWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [FarmWhereInput], {
    nullable: true,
  })
  NOT?: FarmWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  businessName?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  lotSectionPlan?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  abn?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  acn?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  pic?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => UserListRelationFilter, {
    nullable: true,
  })
  users?: UserListRelationFilter | undefined;
}

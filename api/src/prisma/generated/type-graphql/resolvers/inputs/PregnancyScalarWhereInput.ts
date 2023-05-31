import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("PregnancyScalarWhereInput", {
  isAbstract: true,
})
export class PregnancyScalarWhereInput {
  @TypeGraphQL.Field((_type) => [PregnancyScalarWhereInput], {
    nullable: true,
  })
  AND?: PregnancyScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyScalarWhereInput], {
    nullable: true,
  })
  OR?: PregnancyScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyScalarWhereInput], {
    nullable: true,
  })
  NOT?: PregnancyScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  earliestPossibleConception?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  latestPossibleConception?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  conception?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  dueDate?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  earliestPossibleBirth?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableFilter, {
    nullable: true,
  })
  latestPossibleBirth?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  parentId?: StringNullableListFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  pregnancySireId?: StringFilter | undefined;
}

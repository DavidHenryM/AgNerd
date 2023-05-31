import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";

@TypeGraphQL.InputType("MobScalarWhereInput", {
  isAbstract: true,
})
export class MobScalarWhereInput {
  @TypeGraphQL.Field((_type) => [MobScalarWhereInput], {
    nullable: true,
  })
  AND?: MobScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobScalarWhereInput], {
    nullable: true,
  })
  OR?: MobScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobScalarWhereInput], {
    nullable: true,
  })
  NOT?: MobScalarWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  name?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableFilter, {
    nullable: true,
  })
  comment?: StringNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableListFilter, {
    nullable: true,
  })
  grazeIds?: StringNullableListFilter | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringNullableListFilter } from "../inputs/StringNullableListFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("MobScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class MobScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [MobScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: MobScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [MobScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: MobScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [MobScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: MobScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  name?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  comment?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableListFilter, {
    nullable: true
  })
  grazeIds?: StringNullableListFilter | undefined;
}

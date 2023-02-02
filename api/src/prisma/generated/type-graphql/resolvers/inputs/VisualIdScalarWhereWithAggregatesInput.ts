import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumVisualIdColourNullableWithAggregatesFilter } from "../inputs/EnumVisualIdColourNullableWithAggregatesFilter";
import { IntNullableWithAggregatesFilter } from "../inputs/IntNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("VisualIdScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class VisualIdScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [VisualIdScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: VisualIdScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [VisualIdScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: VisualIdScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [VisualIdScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: VisualIdScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  livestockUnitId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumVisualIdColourNullableWithAggregatesFilter, {
    nullable: true
  })
  colour?: EnumVisualIdColourNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableWithAggregatesFilter, {
    nullable: true
  })
  number?: IntNullableWithAggregatesFilter | undefined;
}

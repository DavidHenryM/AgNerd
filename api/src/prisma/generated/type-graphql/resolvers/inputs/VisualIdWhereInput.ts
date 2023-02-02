import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EnumVisualIdColourNullableFilter } from "../inputs/EnumVisualIdColourNullableFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { LivestockUnitRelationFilter } from "../inputs/LivestockUnitRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("VisualIdWhereInput", {
  isAbstract: true
})
export class VisualIdWhereInput {
  @TypeGraphQL.Field(_type => [VisualIdWhereInput], {
    nullable: true
  })
  AND?: VisualIdWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [VisualIdWhereInput], {
    nullable: true
  })
  OR?: VisualIdWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [VisualIdWhereInput], {
    nullable: true
  })
  NOT?: VisualIdWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitRelationFilter, {
    nullable: true
  })
  livestockUnit?: LivestockUnitRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  livestockUnitId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => EnumVisualIdColourNullableFilter, {
    nullable: true
  })
  colour?: EnumVisualIdColourNullableFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  number?: IntNullableFilter | undefined;
}

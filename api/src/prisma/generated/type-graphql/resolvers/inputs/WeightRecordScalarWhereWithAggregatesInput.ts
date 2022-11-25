import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { EnumWeighMethodWithAggregatesFilter } from "../inputs/EnumWeighMethodWithAggregatesFilter";
import { FloatWithAggregatesFilter } from "../inputs/FloatWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("WeightRecordScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class WeightRecordScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [WeightRecordScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: WeightRecordScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: WeightRecordScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: WeightRecordScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => FloatWithAggregatesFilter, {
    nullable: true
  })
  weight?: FloatWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  dateMeasured?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumWeighMethodWithAggregatesFilter, {
    nullable: true
  })
  method?: EnumWeighMethodWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  livestockunitId?: StringWithAggregatesFilter | undefined;
}

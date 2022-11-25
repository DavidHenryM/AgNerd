import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumWeighMethodFilter } from "../inputs/EnumWeighMethodFilter";
import { FloatFilter } from "../inputs/FloatFilter";
import { LivestockUnitRelationFilter } from "../inputs/LivestockUnitRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("WeightRecordWhereInput", {
  isAbstract: true
})
export class WeightRecordWhereInput {
  @TypeGraphQL.Field(_type => [WeightRecordWhereInput], {
    nullable: true
  })
  AND?: WeightRecordWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordWhereInput], {
    nullable: true
  })
  OR?: WeightRecordWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordWhereInput], {
    nullable: true
  })
  NOT?: WeightRecordWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => FloatFilter, {
    nullable: true
  })
  weight?: FloatFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  dateMeasured?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => EnumWeighMethodFilter, {
    nullable: true
  })
  method?: EnumWeighMethodFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  livestockunitId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitRelationFilter, {
    nullable: true
  })
  livestockUnit?: LivestockUnitRelationFilter | undefined;
}

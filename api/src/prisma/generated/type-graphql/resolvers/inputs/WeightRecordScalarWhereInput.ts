import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumWeighMethodFilter } from "../inputs/EnumWeighMethodFilter";
import { FloatFilter } from "../inputs/FloatFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("WeightRecordScalarWhereInput", {
  isAbstract: true
})
export class WeightRecordScalarWhereInput {
  @TypeGraphQL.Field(_type => [WeightRecordScalarWhereInput], {
    nullable: true
  })
  AND?: WeightRecordScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordScalarWhereInput], {
    nullable: true
  })
  OR?: WeightRecordScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordScalarWhereInput], {
    nullable: true
  })
  NOT?: WeightRecordScalarWhereInput[] | undefined;

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
}

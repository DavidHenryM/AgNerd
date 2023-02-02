import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { EnumApplicationMethodWithAggregatesFilter } from "../inputs/EnumApplicationMethodWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("ChemicalTreatmentScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class ChemicalTreatmentScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [ChemicalTreatmentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: ChemicalTreatmentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ChemicalTreatmentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: ChemicalTreatmentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ChemicalTreatmentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: ChemicalTreatmentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  livestockUnitId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  treatmentDate?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => EnumApplicationMethodWithAggregatesFilter, {
    nullable: true
  })
  applicationMethod?: EnumApplicationMethodWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  volume_ml?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  witholdingPeriodDays?: IntWithAggregatesFilter | undefined;
}

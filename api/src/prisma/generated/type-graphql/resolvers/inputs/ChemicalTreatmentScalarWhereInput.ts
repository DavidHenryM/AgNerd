import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumApplicationMethodFilter } from "../inputs/EnumApplicationMethodFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ChemicalTreatmentScalarWhereInput", {
  isAbstract: true
})
export class ChemicalTreatmentScalarWhereInput {
  @TypeGraphQL.Field(_type => [ChemicalTreatmentScalarWhereInput], {
    nullable: true
  })
  AND?: ChemicalTreatmentScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ChemicalTreatmentScalarWhereInput], {
    nullable: true
  })
  OR?: ChemicalTreatmentScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ChemicalTreatmentScalarWhereInput], {
    nullable: true
  })
  NOT?: ChemicalTreatmentScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  livestockUnitId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  treatmentDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => EnumApplicationMethodFilter, {
    nullable: true
  })
  applicationMethod?: EnumApplicationMethodFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  volume_ml?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  witholdingPeriodDays?: IntFilter | undefined;
}

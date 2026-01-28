import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductRelationFilter } from "../inputs/ChemicalProductRelationFilter";
import { ChemicalTreatmentWhereInput } from "../inputs/ChemicalTreatmentWhereInput";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumApplicationMethodFilter } from "../inputs/EnumApplicationMethodFilter";
import { IntFilter } from "../inputs/IntFilter";
import { LivestockUnitRelationFilter } from "../inputs/LivestockUnitRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ChemicalTreatmentWhereUniqueInput", {})
export class ChemicalTreatmentWhereUniqueInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentWhereInput], {
    nullable: true,
  })
  AND?: ChemicalTreatmentWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentWhereInput], {
    nullable: true,
  })
  OR?: ChemicalTreatmentWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentWhereInput], {
    nullable: true,
  })
  NOT?: ChemicalTreatmentWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  livestockUnitId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeFilter, {
    nullable: true,
  })
  treatmentDate?: DateTimeFilter | undefined;

  @TypeGraphQL.Field((_type) => EnumApplicationMethodFilter, {
    nullable: true,
  })
  applicationMethod?: EnumApplicationMethodFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  chemicalProductId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  volumeMl?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitRelationFilter, {
    nullable: true,
  })
  liveStockUnit?: LivestockUnitRelationFilter | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductRelationFilter, {
    nullable: true,
  })
  product?: ChemicalProductRelationFilter | undefined;
}

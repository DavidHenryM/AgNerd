import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentRelationFilter } from "../inputs/ChemicalTreatmentRelationFilter";
import { FloatNullableFilter } from "../inputs/FloatNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ChemicalProductWhereInput", {
  isAbstract: true,
})
export class ChemicalProductWhereInput {
  @TypeGraphQL.Field((_type) => [ChemicalProductWhereInput], {
    nullable: true,
  })
  AND?: ChemicalProductWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalProductWhereInput], {
    nullable: true,
  })
  OR?: ChemicalProductWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalProductWhereInput], {
    nullable: true,
  })
  NOT?: ChemicalProductWhereInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  chemicalTreatmentId?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  manufacturer?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  product_name?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => StringFilter, {
    nullable: true,
  })
  serial_number?: StringFilter | undefined;

  @TypeGraphQL.Field((_type) => IntFilter, {
    nullable: true,
  })
  volume_ml?: IntFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableFilter, {
    nullable: true,
  })
  cost?: FloatNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentRelationFilter, {
    nullable: true,
  })
  treatment?: ChemicalTreatmentRelationFilter | undefined;
}

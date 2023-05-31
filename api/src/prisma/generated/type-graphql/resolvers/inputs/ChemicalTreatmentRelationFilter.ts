import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentWhereInput } from "../inputs/ChemicalTreatmentWhereInput";

@TypeGraphQL.InputType("ChemicalTreatmentRelationFilter", {
  isAbstract: true,
})
export class ChemicalTreatmentRelationFilter {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereInput, {
    nullable: true,
  })
  is?: ChemicalTreatmentWhereInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereInput, {
    nullable: true,
  })
  isNot?: ChemicalTreatmentWhereInput | undefined;
}

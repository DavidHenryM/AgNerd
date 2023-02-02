import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentWhereInput } from "../inputs/ChemicalTreatmentWhereInput";

@TypeGraphQL.InputType("ChemicalTreatmentListRelationFilter", {
  isAbstract: true
})
export class ChemicalTreatmentListRelationFilter {
  @TypeGraphQL.Field(_type => ChemicalTreatmentWhereInput, {
    nullable: true
  })
  every?: ChemicalTreatmentWhereInput | undefined;

  @TypeGraphQL.Field(_type => ChemicalTreatmentWhereInput, {
    nullable: true
  })
  some?: ChemicalTreatmentWhereInput | undefined;

  @TypeGraphQL.Field(_type => ChemicalTreatmentWhereInput, {
    nullable: true
  })
  none?: ChemicalTreatmentWhereInput | undefined;
}

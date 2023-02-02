import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentUpdateWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentUpdateWithoutLiveStockUnitInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalTreatmentUpdateWithWhereUniqueWithoutLiveStockUnitInput", {
  isAbstract: true
})
export class ChemicalTreatmentUpdateWithWhereUniqueWithoutLiveStockUnitInput {
  @TypeGraphQL.Field(_type => ChemicalTreatmentWhereUniqueInput, {
    nullable: false
  })
  where!: ChemicalTreatmentWhereUniqueInput;

  @TypeGraphQL.Field(_type => ChemicalTreatmentUpdateWithoutLiveStockUnitInput, {
    nullable: false
  })
  data!: ChemicalTreatmentUpdateWithoutLiveStockUnitInput;
}

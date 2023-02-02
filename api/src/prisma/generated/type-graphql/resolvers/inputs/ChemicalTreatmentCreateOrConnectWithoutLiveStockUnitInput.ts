import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateWithoutLiveStockUnitInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput", {
  isAbstract: true
})
export class ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput {
  @TypeGraphQL.Field(_type => ChemicalTreatmentWhereUniqueInput, {
    nullable: false
  })
  where!: ChemicalTreatmentWhereUniqueInput;

  @TypeGraphQL.Field(_type => ChemicalTreatmentCreateWithoutLiveStockUnitInput, {
    nullable: false
  })
  create!: ChemicalTreatmentCreateWithoutLiveStockUnitInput;
}

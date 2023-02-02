import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateWithoutLiveStockUnitInput";
import { ChemicalTreatmentUpdateWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentUpdateWithoutLiveStockUnitInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalTreatmentUpsertWithWhereUniqueWithoutLiveStockUnitInput", {
  isAbstract: true
})
export class ChemicalTreatmentUpsertWithWhereUniqueWithoutLiveStockUnitInput {
  @TypeGraphQL.Field(_type => ChemicalTreatmentWhereUniqueInput, {
    nullable: false
  })
  where!: ChemicalTreatmentWhereUniqueInput;

  @TypeGraphQL.Field(_type => ChemicalTreatmentUpdateWithoutLiveStockUnitInput, {
    nullable: false
  })
  update!: ChemicalTreatmentUpdateWithoutLiveStockUnitInput;

  @TypeGraphQL.Field(_type => ChemicalTreatmentCreateWithoutLiveStockUnitInput, {
    nullable: false
  })
  create!: ChemicalTreatmentCreateWithoutLiveStockUnitInput;
}

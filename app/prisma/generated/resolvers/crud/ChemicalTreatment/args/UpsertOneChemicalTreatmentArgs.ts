import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentCreateInput } from "../../../inputs/ChemicalTreatmentCreateInput";
import { ChemicalTreatmentUpdateInput } from "../../../inputs/ChemicalTreatmentUpdateInput";
import { ChemicalTreatmentWhereUniqueInput } from "../../../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneChemicalTreatmentArgs {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereUniqueInput, {
    nullable: false,
  })
  where!: ChemicalTreatmentWhereUniqueInput;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentCreateInput, {
    nullable: false,
  })
  create!: ChemicalTreatmentCreateInput;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentUpdateInput, {
    nullable: false,
  })
  update!: ChemicalTreatmentUpdateInput;
}

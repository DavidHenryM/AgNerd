import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentCreateInput } from "../../../inputs/ChemicalTreatmentCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneChemicalTreatmentArgs {
  @TypeGraphQL.Field(_type => ChemicalTreatmentCreateInput, {
    nullable: false
  })
  data!: ChemicalTreatmentCreateInput;
}

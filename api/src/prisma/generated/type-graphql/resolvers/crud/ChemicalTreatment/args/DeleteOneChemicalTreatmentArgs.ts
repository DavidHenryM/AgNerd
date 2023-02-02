import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentWhereUniqueInput } from "../../../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOneChemicalTreatmentArgs {
  @TypeGraphQL.Field(_type => ChemicalTreatmentWhereUniqueInput, {
    nullable: false
  })
  where!: ChemicalTreatmentWhereUniqueInput;
}

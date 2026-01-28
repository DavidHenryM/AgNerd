import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentUpdateInput } from "../../../inputs/ChemicalTreatmentUpdateInput";
import { ChemicalTreatmentWhereUniqueInput } from "../../../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneChemicalTreatmentArgs {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentUpdateInput, {
    nullable: false,
  })
  data!: ChemicalTreatmentUpdateInput;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereUniqueInput, {
    nullable: false,
  })
  where!: ChemicalTreatmentWhereUniqueInput;
}

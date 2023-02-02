import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentUpdateManyMutationInput } from "../../../inputs/ChemicalTreatmentUpdateManyMutationInput";
import { ChemicalTreatmentWhereInput } from "../../../inputs/ChemicalTreatmentWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyChemicalTreatmentArgs {
  @TypeGraphQL.Field(_type => ChemicalTreatmentUpdateManyMutationInput, {
    nullable: false
  })
  data!: ChemicalTreatmentUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ChemicalTreatmentWhereInput, {
    nullable: true
  })
  where?: ChemicalTreatmentWhereInput | undefined;
}

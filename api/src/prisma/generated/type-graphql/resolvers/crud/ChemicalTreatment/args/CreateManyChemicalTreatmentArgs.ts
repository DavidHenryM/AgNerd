import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentCreateManyInput } from "../../../inputs/ChemicalTreatmentCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyChemicalTreatmentArgs {
  @TypeGraphQL.Field((_type) => [ChemicalTreatmentCreateManyInput], {
    nullable: false,
  })
  data!: ChemicalTreatmentCreateManyInput[];
}

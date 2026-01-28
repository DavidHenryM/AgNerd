import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentScalarWhereInput } from "../inputs/ChemicalTreatmentScalarWhereInput";
import { ChemicalTreatmentUpdateManyMutationInput } from "../inputs/ChemicalTreatmentUpdateManyMutationInput";

@TypeGraphQL.InputType(
  "ChemicalTreatmentUpdateManyWithWhereWithoutProductInput",
  {},
)
export class ChemicalTreatmentUpdateManyWithWhereWithoutProductInput {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentScalarWhereInput, {
    nullable: false,
  })
  where!: ChemicalTreatmentScalarWhereInput;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentUpdateManyMutationInput, {
    nullable: false,
  })
  data!: ChemicalTreatmentUpdateManyMutationInput;
}

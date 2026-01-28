import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentUpdateWithoutProductInput } from "../inputs/ChemicalTreatmentUpdateWithoutProductInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalTreatmentUpdateWithWhereUniqueWithoutProductInput",
  {},
)
export class ChemicalTreatmentUpdateWithWhereUniqueWithoutProductInput {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereUniqueInput, {
    nullable: false,
  })
  where!: ChemicalTreatmentWhereUniqueInput;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentUpdateWithoutProductInput, {
    nullable: false,
  })
  data!: ChemicalTreatmentUpdateWithoutProductInput;
}

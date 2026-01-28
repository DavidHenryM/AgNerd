import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateWithoutProductInput } from "../inputs/ChemicalTreatmentCreateWithoutProductInput";
import { ChemicalTreatmentUpdateWithoutProductInput } from "../inputs/ChemicalTreatmentUpdateWithoutProductInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalTreatmentUpsertWithWhereUniqueWithoutProductInput",
  {},
)
export class ChemicalTreatmentUpsertWithWhereUniqueWithoutProductInput {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereUniqueInput, {
    nullable: false,
  })
  where!: ChemicalTreatmentWhereUniqueInput;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentUpdateWithoutProductInput, {
    nullable: false,
  })
  update!: ChemicalTreatmentUpdateWithoutProductInput;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentCreateWithoutProductInput, {
    nullable: false,
  })
  create!: ChemicalTreatmentCreateWithoutProductInput;
}

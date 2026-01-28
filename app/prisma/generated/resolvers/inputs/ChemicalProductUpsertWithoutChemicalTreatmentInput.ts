import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateWithoutChemicalTreatmentInput } from "../inputs/ChemicalProductCreateWithoutChemicalTreatmentInput";
import { ChemicalProductUpdateWithoutChemicalTreatmentInput } from "../inputs/ChemicalProductUpdateWithoutChemicalTreatmentInput";
import { ChemicalProductWhereInput } from "../inputs/ChemicalProductWhereInput";

@TypeGraphQL.InputType("ChemicalProductUpsertWithoutChemicalTreatmentInput", {})
export class ChemicalProductUpsertWithoutChemicalTreatmentInput {
  @TypeGraphQL.Field(
    (_type) => ChemicalProductUpdateWithoutChemicalTreatmentInput,
    {
      nullable: false,
    },
  )
  update!: ChemicalProductUpdateWithoutChemicalTreatmentInput;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateWithoutChemicalTreatmentInput,
    {
      nullable: false,
    },
  )
  create!: ChemicalProductCreateWithoutChemicalTreatmentInput;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereInput, {
    nullable: true,
  })
  where?: ChemicalProductWhereInput | undefined;
}

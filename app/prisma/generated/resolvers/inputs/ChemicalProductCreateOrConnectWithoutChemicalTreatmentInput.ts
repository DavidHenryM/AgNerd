import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateWithoutChemicalTreatmentInput } from "../inputs/ChemicalProductCreateWithoutChemicalTreatmentInput";
import { ChemicalProductWhereUniqueInput } from "../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalProductCreateOrConnectWithoutChemicalTreatmentInput",
  {},
)
export class ChemicalProductCreateOrConnectWithoutChemicalTreatmentInput {
  @TypeGraphQL.Field((_type) => ChemicalProductWhereUniqueInput, {
    nullable: false,
  })
  where!: ChemicalProductWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateWithoutChemicalTreatmentInput,
    {
      nullable: false,
    },
  )
  create!: ChemicalProductCreateWithoutChemicalTreatmentInput;
}

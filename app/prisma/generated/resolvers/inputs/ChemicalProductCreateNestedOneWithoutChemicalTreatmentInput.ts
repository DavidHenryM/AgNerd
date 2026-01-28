import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateOrConnectWithoutChemicalTreatmentInput } from "../inputs/ChemicalProductCreateOrConnectWithoutChemicalTreatmentInput";
import { ChemicalProductCreateWithoutChemicalTreatmentInput } from "../inputs/ChemicalProductCreateWithoutChemicalTreatmentInput";
import { ChemicalProductWhereUniqueInput } from "../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalProductCreateNestedOneWithoutChemicalTreatmentInput",
  {},
)
export class ChemicalProductCreateNestedOneWithoutChemicalTreatmentInput {
  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateWithoutChemicalTreatmentInput,
    {
      nullable: true,
    },
  )
  create?: ChemicalProductCreateWithoutChemicalTreatmentInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateOrConnectWithoutChemicalTreatmentInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | ChemicalProductCreateOrConnectWithoutChemicalTreatmentInput
    | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereUniqueInput, {
    nullable: true,
  })
  connect?: ChemicalProductWhereUniqueInput | undefined;
}

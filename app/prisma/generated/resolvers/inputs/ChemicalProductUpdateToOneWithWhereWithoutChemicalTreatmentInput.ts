import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductUpdateWithoutChemicalTreatmentInput } from "../inputs/ChemicalProductUpdateWithoutChemicalTreatmentInput";
import { ChemicalProductWhereInput } from "../inputs/ChemicalProductWhereInput";

@TypeGraphQL.InputType(
  "ChemicalProductUpdateToOneWithWhereWithoutChemicalTreatmentInput",
  {},
)
export class ChemicalProductUpdateToOneWithWhereWithoutChemicalTreatmentInput {
  @TypeGraphQL.Field((_type) => ChemicalProductWhereInput, {
    nullable: true,
  })
  where?: ChemicalProductWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductUpdateWithoutChemicalTreatmentInput,
    {
      nullable: false,
    },
  )
  data!: ChemicalProductUpdateWithoutChemicalTreatmentInput;
}

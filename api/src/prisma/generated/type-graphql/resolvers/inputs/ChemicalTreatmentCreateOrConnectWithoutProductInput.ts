import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateWithoutProductInput } from "../inputs/ChemicalTreatmentCreateWithoutProductInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalTreatmentCreateOrConnectWithoutProductInput", {
  isAbstract: true,
})
export class ChemicalTreatmentCreateOrConnectWithoutProductInput {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereUniqueInput, {
    nullable: false,
  })
  where!: ChemicalTreatmentWhereUniqueInput;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentCreateWithoutProductInput, {
    nullable: false,
  })
  create!: ChemicalTreatmentCreateWithoutProductInput;
}

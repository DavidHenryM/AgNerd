import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateWithoutTreatmentInput } from "../inputs/ChemicalProductCreateWithoutTreatmentInput";
import { ChemicalProductWhereUniqueInput } from "../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalProductCreateOrConnectWithoutTreatmentInput", {
  isAbstract: true
})
export class ChemicalProductCreateOrConnectWithoutTreatmentInput {
  @TypeGraphQL.Field(_type => ChemicalProductWhereUniqueInput, {
    nullable: false
  })
  where!: ChemicalProductWhereUniqueInput;

  @TypeGraphQL.Field(_type => ChemicalProductCreateWithoutTreatmentInput, {
    nullable: false
  })
  create!: ChemicalProductCreateWithoutTreatmentInput;
}

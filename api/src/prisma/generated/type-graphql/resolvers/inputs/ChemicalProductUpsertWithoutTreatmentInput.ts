import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateWithoutTreatmentInput } from "../inputs/ChemicalProductCreateWithoutTreatmentInput";
import { ChemicalProductUpdateWithoutTreatmentInput } from "../inputs/ChemicalProductUpdateWithoutTreatmentInput";

@TypeGraphQL.InputType("ChemicalProductUpsertWithoutTreatmentInput", {
  isAbstract: true,
})
export class ChemicalProductUpsertWithoutTreatmentInput {
  @TypeGraphQL.Field((_type) => ChemicalProductUpdateWithoutTreatmentInput, {
    nullable: false,
  })
  update!: ChemicalProductUpdateWithoutTreatmentInput;

  @TypeGraphQL.Field((_type) => ChemicalProductCreateWithoutTreatmentInput, {
    nullable: false,
  })
  create!: ChemicalProductCreateWithoutTreatmentInput;
}

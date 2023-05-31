import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateOrConnectWithoutProductInput } from "../inputs/ChemicalTreatmentCreateOrConnectWithoutProductInput";
import { ChemicalTreatmentCreateWithoutProductInput } from "../inputs/ChemicalTreatmentCreateWithoutProductInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalTreatmentCreateNestedOneWithoutProductInput", {
  isAbstract: true,
})
export class ChemicalTreatmentCreateNestedOneWithoutProductInput {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentCreateWithoutProductInput, {
    nullable: true,
  })
  create?: ChemicalTreatmentCreateWithoutProductInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentCreateOrConnectWithoutProductInput,
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | ChemicalTreatmentCreateOrConnectWithoutProductInput
    | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereUniqueInput, {
    nullable: true,
  })
  connect?: ChemicalTreatmentWhereUniqueInput | undefined;
}

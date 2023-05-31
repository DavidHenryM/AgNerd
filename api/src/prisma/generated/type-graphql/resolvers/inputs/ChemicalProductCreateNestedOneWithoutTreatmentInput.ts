import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateOrConnectWithoutTreatmentInput } from "../inputs/ChemicalProductCreateOrConnectWithoutTreatmentInput";
import { ChemicalProductCreateWithoutTreatmentInput } from "../inputs/ChemicalProductCreateWithoutTreatmentInput";
import { ChemicalProductWhereUniqueInput } from "../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalProductCreateNestedOneWithoutTreatmentInput", {
  isAbstract: true,
})
export class ChemicalProductCreateNestedOneWithoutTreatmentInput {
  @TypeGraphQL.Field((_type) => ChemicalProductCreateWithoutTreatmentInput, {
    nullable: true,
  })
  create?: ChemicalProductCreateWithoutTreatmentInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalProductCreateOrConnectWithoutTreatmentInput,
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | ChemicalProductCreateOrConnectWithoutTreatmentInput
    | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereUniqueInput, {
    nullable: true,
  })
  connect?: ChemicalProductWhereUniqueInput | undefined;
}

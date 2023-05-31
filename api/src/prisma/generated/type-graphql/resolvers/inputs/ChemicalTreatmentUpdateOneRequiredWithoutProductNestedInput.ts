import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateOrConnectWithoutProductInput } from "../inputs/ChemicalTreatmentCreateOrConnectWithoutProductInput";
import { ChemicalTreatmentCreateWithoutProductInput } from "../inputs/ChemicalTreatmentCreateWithoutProductInput";
import { ChemicalTreatmentUpdateWithoutProductInput } from "../inputs/ChemicalTreatmentUpdateWithoutProductInput";
import { ChemicalTreatmentUpsertWithoutProductInput } from "../inputs/ChemicalTreatmentUpsertWithoutProductInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalTreatmentUpdateOneRequiredWithoutProductNestedInput",
  {
    isAbstract: true,
  }
)
export class ChemicalTreatmentUpdateOneRequiredWithoutProductNestedInput {
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

  @TypeGraphQL.Field((_type) => ChemicalTreatmentUpsertWithoutProductInput, {
    nullable: true,
  })
  upsert?: ChemicalTreatmentUpsertWithoutProductInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereUniqueInput, {
    nullable: true,
  })
  connect?: ChemicalTreatmentWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentUpdateWithoutProductInput, {
    nullable: true,
  })
  update?: ChemicalTreatmentUpdateWithoutProductInput | undefined;
}

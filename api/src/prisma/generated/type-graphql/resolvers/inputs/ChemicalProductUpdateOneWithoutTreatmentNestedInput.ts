import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductCreateOrConnectWithoutTreatmentInput } from "../inputs/ChemicalProductCreateOrConnectWithoutTreatmentInput";
import { ChemicalProductCreateWithoutTreatmentInput } from "../inputs/ChemicalProductCreateWithoutTreatmentInput";
import { ChemicalProductUpdateWithoutTreatmentInput } from "../inputs/ChemicalProductUpdateWithoutTreatmentInput";
import { ChemicalProductUpsertWithoutTreatmentInput } from "../inputs/ChemicalProductUpsertWithoutTreatmentInput";
import { ChemicalProductWhereUniqueInput } from "../inputs/ChemicalProductWhereUniqueInput";

@TypeGraphQL.InputType("ChemicalProductUpdateOneWithoutTreatmentNestedInput", {
  isAbstract: true,
})
export class ChemicalProductUpdateOneWithoutTreatmentNestedInput {
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

  @TypeGraphQL.Field((_type) => ChemicalProductUpsertWithoutTreatmentInput, {
    nullable: true,
  })
  upsert?: ChemicalProductUpsertWithoutTreatmentInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereUniqueInput, {
    nullable: true,
  })
  connect?: ChemicalProductWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductUpdateWithoutTreatmentInput, {
    nullable: true,
  })
  update?: ChemicalProductUpdateWithoutTreatmentInput | undefined;
}

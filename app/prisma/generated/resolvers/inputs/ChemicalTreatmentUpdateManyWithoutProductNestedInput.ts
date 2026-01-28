import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateManyProductInputEnvelope } from "../inputs/ChemicalTreatmentCreateManyProductInputEnvelope";
import { ChemicalTreatmentCreateOrConnectWithoutProductInput } from "../inputs/ChemicalTreatmentCreateOrConnectWithoutProductInput";
import { ChemicalTreatmentCreateWithoutProductInput } from "../inputs/ChemicalTreatmentCreateWithoutProductInput";
import { ChemicalTreatmentScalarWhereInput } from "../inputs/ChemicalTreatmentScalarWhereInput";
import { ChemicalTreatmentUpdateManyWithWhereWithoutProductInput } from "../inputs/ChemicalTreatmentUpdateManyWithWhereWithoutProductInput";
import { ChemicalTreatmentUpdateWithWhereUniqueWithoutProductInput } from "../inputs/ChemicalTreatmentUpdateWithWhereUniqueWithoutProductInput";
import { ChemicalTreatmentUpsertWithWhereUniqueWithoutProductInput } from "../inputs/ChemicalTreatmentUpsertWithWhereUniqueWithoutProductInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalTreatmentUpdateManyWithoutProductNestedInput",
  {},
)
export class ChemicalTreatmentUpdateManyWithoutProductNestedInput {
  @TypeGraphQL.Field((_type) => [ChemicalTreatmentCreateWithoutProductInput], {
    nullable: true,
  })
  create?: ChemicalTreatmentCreateWithoutProductInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentCreateOrConnectWithoutProductInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | ChemicalTreatmentCreateOrConnectWithoutProductInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentUpsertWithWhereUniqueWithoutProductInput],
    {
      nullable: true,
    },
  )
  upsert?:
    | ChemicalTreatmentUpsertWithWhereUniqueWithoutProductInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentCreateManyProductInputEnvelope,
    {
      nullable: true,
    },
  )
  createMany?: ChemicalTreatmentCreateManyProductInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentWhereUniqueInput], {
    nullable: true,
  })
  set?: ChemicalTreatmentWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: ChemicalTreatmentWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentWhereUniqueInput], {
    nullable: true,
  })
  delete?: ChemicalTreatmentWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentWhereUniqueInput], {
    nullable: true,
  })
  connect?: ChemicalTreatmentWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentUpdateWithWhereUniqueWithoutProductInput],
    {
      nullable: true,
    },
  )
  update?:
    | ChemicalTreatmentUpdateWithWhereUniqueWithoutProductInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentUpdateManyWithWhereWithoutProductInput],
    {
      nullable: true,
    },
  )
  updateMany?:
    | ChemicalTreatmentUpdateManyWithWhereWithoutProductInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: ChemicalTreatmentScalarWhereInput[] | undefined;
}

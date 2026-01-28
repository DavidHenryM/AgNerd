import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope } from "../inputs/ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope";
import { ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput";
import { ChemicalTreatmentCreateWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentCreateWithoutLiveStockUnitInput";
import { ChemicalTreatmentScalarWhereInput } from "../inputs/ChemicalTreatmentScalarWhereInput";
import { ChemicalTreatmentUpdateManyWithWhereWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentUpdateManyWithWhereWithoutLiveStockUnitInput";
import { ChemicalTreatmentUpdateWithWhereUniqueWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentUpdateWithWhereUniqueWithoutLiveStockUnitInput";
import { ChemicalTreatmentUpsertWithWhereUniqueWithoutLiveStockUnitInput } from "../inputs/ChemicalTreatmentUpsertWithWhereUniqueWithoutLiveStockUnitInput";
import { ChemicalTreatmentWhereUniqueInput } from "../inputs/ChemicalTreatmentWhereUniqueInput";

@TypeGraphQL.InputType(
  "ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput",
  {},
)
export class ChemicalTreatmentUpdateManyWithoutLiveStockUnitNestedInput {
  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentCreateWithoutLiveStockUnitInput],
    {
      nullable: true,
    },
  )
  create?: ChemicalTreatmentCreateWithoutLiveStockUnitInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | ChemicalTreatmentCreateOrConnectWithoutLiveStockUnitInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [
      ChemicalTreatmentUpsertWithWhereUniqueWithoutLiveStockUnitInput,
    ],
    {
      nullable: true,
    },
  )
  upsert?:
    | ChemicalTreatmentUpsertWithWhereUniqueWithoutLiveStockUnitInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope,
    {
      nullable: true,
    },
  )
  createMany?:
    | ChemicalTreatmentCreateManyLiveStockUnitInputEnvelope
    | undefined;

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
    (_type) => [
      ChemicalTreatmentUpdateWithWhereUniqueWithoutLiveStockUnitInput,
    ],
    {
      nullable: true,
    },
  )
  update?:
    | ChemicalTreatmentUpdateWithWhereUniqueWithoutLiveStockUnitInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentUpdateManyWithWhereWithoutLiveStockUnitInput],
    {
      nullable: true,
    },
  )
  updateMany?:
    | ChemicalTreatmentUpdateManyWithWhereWithoutLiveStockUnitInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: ChemicalTreatmentScalarWhereInput[] | undefined;
}

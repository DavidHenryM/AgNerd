import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestCreateManyPregnancyInputEnvelope } from "../inputs/PregnancyTestCreateManyPregnancyInputEnvelope";
import { PregnancyTestCreateOrConnectWithoutPregnancyInput } from "../inputs/PregnancyTestCreateOrConnectWithoutPregnancyInput";
import { PregnancyTestCreateWithoutPregnancyInput } from "../inputs/PregnancyTestCreateWithoutPregnancyInput";
import { PregnancyTestScalarWhereInput } from "../inputs/PregnancyTestScalarWhereInput";
import { PregnancyTestUpdateManyWithWhereWithoutPregnancyInput } from "../inputs/PregnancyTestUpdateManyWithWhereWithoutPregnancyInput";
import { PregnancyTestUpdateWithWhereUniqueWithoutPregnancyInput } from "../inputs/PregnancyTestUpdateWithWhereUniqueWithoutPregnancyInput";
import { PregnancyTestUpsertWithWhereUniqueWithoutPregnancyInput } from "../inputs/PregnancyTestUpsertWithWhereUniqueWithoutPregnancyInput";
import { PregnancyTestWhereUniqueInput } from "../inputs/PregnancyTestWhereUniqueInput";

@TypeGraphQL.InputType("PregnancyTestUpdateManyWithoutPregnancyNestedInput", {})
export class PregnancyTestUpdateManyWithoutPregnancyNestedInput {
  @TypeGraphQL.Field((_type) => [PregnancyTestCreateWithoutPregnancyInput], {
    nullable: true,
  })
  create?: PregnancyTestCreateWithoutPregnancyInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [PregnancyTestCreateOrConnectWithoutPregnancyInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | PregnancyTestCreateOrConnectWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [PregnancyTestUpsertWithWhereUniqueWithoutPregnancyInput],
    {
      nullable: true,
    },
  )
  upsert?:
    | PregnancyTestUpsertWithWhereUniqueWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestCreateManyPregnancyInputEnvelope, {
    nullable: true,
  })
  createMany?: PregnancyTestCreateManyPregnancyInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestWhereUniqueInput], {
    nullable: true,
  })
  set?: PregnancyTestWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: PregnancyTestWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestWhereUniqueInput], {
    nullable: true,
  })
  delete?: PregnancyTestWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestWhereUniqueInput], {
    nullable: true,
  })
  connect?: PregnancyTestWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [PregnancyTestUpdateWithWhereUniqueWithoutPregnancyInput],
    {
      nullable: true,
    },
  )
  update?:
    | PregnancyTestUpdateWithWhereUniqueWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [PregnancyTestUpdateManyWithWhereWithoutPregnancyInput],
    {
      nullable: true,
    },
  )
  updateMany?:
    | PregnancyTestUpdateManyWithWhereWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [PregnancyTestScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: PregnancyTestScalarWhereInput[] | undefined;
}

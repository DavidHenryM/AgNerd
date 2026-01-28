import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateManyDamInputEnvelope } from "../inputs/LivestockUnitCreateManyDamInputEnvelope";
import { LivestockUnitCreateOrConnectWithoutDamInput } from "../inputs/LivestockUnitCreateOrConnectWithoutDamInput";
import { LivestockUnitCreateWithoutDamInput } from "../inputs/LivestockUnitCreateWithoutDamInput";
import { LivestockUnitScalarWhereInput } from "../inputs/LivestockUnitScalarWhereInput";
import { LivestockUnitUpdateManyWithWhereWithoutDamInput } from "../inputs/LivestockUnitUpdateManyWithWhereWithoutDamInput";
import { LivestockUnitUpdateWithWhereUniqueWithoutDamInput } from "../inputs/LivestockUnitUpdateWithWhereUniqueWithoutDamInput";
import { LivestockUnitUpsertWithWhereUniqueWithoutDamInput } from "../inputs/LivestockUnitUpsertWithWhereUniqueWithoutDamInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateManyWithoutDamNestedInput", {})
export class LivestockUnitUpdateManyWithoutDamNestedInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateWithoutDamInput], {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutDamInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitCreateOrConnectWithoutDamInput], {
    nullable: true,
  })
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutDamInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitUpsertWithWhereUniqueWithoutDamInput],
    {
      nullable: true,
    },
  )
  upsert?: LivestockUnitUpsertWithWhereUniqueWithoutDamInput[] | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateManyDamInputEnvelope, {
    nullable: true,
  })
  createMany?: LivestockUnitCreateManyDamInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereUniqueInput], {
    nullable: true,
  })
  set?: LivestockUnitWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: LivestockUnitWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereUniqueInput], {
    nullable: true,
  })
  delete?: LivestockUnitWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitWhereUniqueInput], {
    nullable: true,
  })
  connect?: LivestockUnitWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitUpdateWithWhereUniqueWithoutDamInput],
    {
      nullable: true,
    },
  )
  update?: LivestockUnitUpdateWithWhereUniqueWithoutDamInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitUpdateManyWithWhereWithoutDamInput],
    {
      nullable: true,
    },
  )
  updateMany?: LivestockUnitUpdateManyWithWhereWithoutDamInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: LivestockUnitScalarWhereInput[] | undefined;
}

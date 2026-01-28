import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateManySireInputEnvelope } from "../inputs/LivestockUnitCreateManySireInputEnvelope";
import { LivestockUnitCreateOrConnectWithoutSireInput } from "../inputs/LivestockUnitCreateOrConnectWithoutSireInput";
import { LivestockUnitCreateWithoutSireInput } from "../inputs/LivestockUnitCreateWithoutSireInput";
import { LivestockUnitScalarWhereInput } from "../inputs/LivestockUnitScalarWhereInput";
import { LivestockUnitUpdateManyWithWhereWithoutSireInput } from "../inputs/LivestockUnitUpdateManyWithWhereWithoutSireInput";
import { LivestockUnitUpdateWithWhereUniqueWithoutSireInput } from "../inputs/LivestockUnitUpdateWithWhereUniqueWithoutSireInput";
import { LivestockUnitUpsertWithWhereUniqueWithoutSireInput } from "../inputs/LivestockUnitUpsertWithWhereUniqueWithoutSireInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateManyWithoutSireNestedInput", {})
export class LivestockUnitUpdateManyWithoutSireNestedInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateWithoutSireInput], {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutSireInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitCreateOrConnectWithoutSireInput],
    {
      nullable: true,
    },
  )
  connectOrCreate?: LivestockUnitCreateOrConnectWithoutSireInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitUpsertWithWhereUniqueWithoutSireInput],
    {
      nullable: true,
    },
  )
  upsert?: LivestockUnitUpsertWithWhereUniqueWithoutSireInput[] | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitCreateManySireInputEnvelope, {
    nullable: true,
  })
  createMany?: LivestockUnitCreateManySireInputEnvelope | undefined;

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
    (_type) => [LivestockUnitUpdateWithWhereUniqueWithoutSireInput],
    {
      nullable: true,
    },
  )
  update?: LivestockUnitUpdateWithWhereUniqueWithoutSireInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitUpdateManyWithWhereWithoutSireInput],
    {
      nullable: true,
    },
  )
  updateMany?: LivestockUnitUpdateManyWithWhereWithoutSireInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: LivestockUnitScalarWhereInput[] | undefined;
}

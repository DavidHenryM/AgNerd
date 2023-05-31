import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateOrConnectWithoutPregnancyInput } from "../inputs/LivestockUnitCreateOrConnectWithoutPregnancyInput";
import { LivestockUnitCreateWithoutPregnancyInput } from "../inputs/LivestockUnitCreateWithoutPregnancyInput";
import { LivestockUnitScalarWhereInput } from "../inputs/LivestockUnitScalarWhereInput";
import { LivestockUnitUpdateManyWithWhereWithoutPregnancyInput } from "../inputs/LivestockUnitUpdateManyWithWhereWithoutPregnancyInput";
import { LivestockUnitUpdateWithWhereUniqueWithoutPregnancyInput } from "../inputs/LivestockUnitUpdateWithWhereUniqueWithoutPregnancyInput";
import { LivestockUnitUpsertWithWhereUniqueWithoutPregnancyInput } from "../inputs/LivestockUnitUpsertWithWhereUniqueWithoutPregnancyInput";
import { LivestockUnitWhereUniqueInput } from "../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.InputType("LivestockUnitUpdateManyWithoutPregnancyNestedInput", {
  isAbstract: true,
})
export class LivestockUnitUpdateManyWithoutPregnancyNestedInput {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateWithoutPregnancyInput], {
    nullable: true,
  })
  create?: LivestockUnitCreateWithoutPregnancyInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitCreateOrConnectWithoutPregnancyInput],
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | LivestockUnitCreateOrConnectWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitUpsertWithWhereUniqueWithoutPregnancyInput],
    {
      nullable: true,
    }
  )
  upsert?:
    | LivestockUnitUpsertWithWhereUniqueWithoutPregnancyInput[]
    | undefined;

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
    (_type) => [LivestockUnitUpdateWithWhereUniqueWithoutPregnancyInput],
    {
      nullable: true,
    }
  )
  update?:
    | LivestockUnitUpdateWithWhereUniqueWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field(
    (_type) => [LivestockUnitUpdateManyWithWhereWithoutPregnancyInput],
    {
      nullable: true,
    }
  )
  updateMany?:
    | LivestockUnitUpdateManyWithWhereWithoutPregnancyInput[]
    | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: LivestockUnitScalarWhereInput[] | undefined;
}

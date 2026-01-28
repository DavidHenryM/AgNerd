import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateManyPaddockInputEnvelope } from "../inputs/GeoPointCreateManyPaddockInputEnvelope";
import { GeoPointCreateOrConnectWithoutPaddockInput } from "../inputs/GeoPointCreateOrConnectWithoutPaddockInput";
import { GeoPointCreateWithoutPaddockInput } from "../inputs/GeoPointCreateWithoutPaddockInput";
import { GeoPointScalarWhereInput } from "../inputs/GeoPointScalarWhereInput";
import { GeoPointUpdateManyWithWhereWithoutPaddockInput } from "../inputs/GeoPointUpdateManyWithWhereWithoutPaddockInput";
import { GeoPointUpdateWithWhereUniqueWithoutPaddockInput } from "../inputs/GeoPointUpdateWithWhereUniqueWithoutPaddockInput";
import { GeoPointUpsertWithWhereUniqueWithoutPaddockInput } from "../inputs/GeoPointUpsertWithWhereUniqueWithoutPaddockInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType("GeoPointUpdateManyWithoutPaddockNestedInput", {})
export class GeoPointUpdateManyWithoutPaddockNestedInput {
  @TypeGraphQL.Field((_type) => [GeoPointCreateWithoutPaddockInput], {
    nullable: true,
  })
  create?: GeoPointCreateWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointCreateOrConnectWithoutPaddockInput], {
    nullable: true,
  })
  connectOrCreate?: GeoPointCreateOrConnectWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [GeoPointUpsertWithWhereUniqueWithoutPaddockInput],
    {
      nullable: true,
    },
  )
  upsert?: GeoPointUpsertWithWhereUniqueWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field((_type) => GeoPointCreateManyPaddockInputEnvelope, {
    nullable: true,
  })
  createMany?: GeoPointCreateManyPaddockInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointWhereUniqueInput], {
    nullable: true,
  })
  set?: GeoPointWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: GeoPointWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointWhereUniqueInput], {
    nullable: true,
  })
  delete?: GeoPointWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointWhereUniqueInput], {
    nullable: true,
  })
  connect?: GeoPointWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [GeoPointUpdateWithWhereUniqueWithoutPaddockInput],
    {
      nullable: true,
    },
  )
  update?: GeoPointUpdateWithWhereUniqueWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [GeoPointUpdateManyWithWhereWithoutPaddockInput],
    {
      nullable: true,
    },
  )
  updateMany?: GeoPointUpdateManyWithWhereWithoutPaddockInput[] | undefined;

  @TypeGraphQL.Field((_type) => [GeoPointScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: GeoPointScalarWhereInput[] | undefined;
}

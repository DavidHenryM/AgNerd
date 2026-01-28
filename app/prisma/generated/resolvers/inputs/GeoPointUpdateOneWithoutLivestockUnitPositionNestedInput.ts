import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateOrConnectWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateOrConnectWithoutLivestockUnitPositionInput";
import { GeoPointCreateWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateWithoutLivestockUnitPositionInput";
import { GeoPointUpdateToOneWithWhereWithoutLivestockUnitPositionInput } from "../inputs/GeoPointUpdateToOneWithWhereWithoutLivestockUnitPositionInput";
import { GeoPointUpsertWithoutLivestockUnitPositionInput } from "../inputs/GeoPointUpsertWithoutLivestockUnitPositionInput";
import { GeoPointWhereInput } from "../inputs/GeoPointWhereInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType(
  "GeoPointUpdateOneWithoutLivestockUnitPositionNestedInput",
  {},
)
export class GeoPointUpdateOneWithoutLivestockUnitPositionNestedInput {
  @TypeGraphQL.Field(
    (_type) => GeoPointCreateWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    },
  )
  create?: GeoPointCreateWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field(
    (_type) => GeoPointCreateOrConnectWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    },
  )
  connectOrCreate?:
    | GeoPointCreateOrConnectWithoutLivestockUnitPositionInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => GeoPointUpsertWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    },
  )
  upsert?: GeoPointUpsertWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  disconnect?: GeoPointWhereInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  delete?: GeoPointWhereInput | undefined;

  @TypeGraphQL.Field((_type) => GeoPointWhereUniqueInput, {
    nullable: true,
  })
  connect?: GeoPointWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => GeoPointUpdateToOneWithWhereWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    },
  )
  update?:
    | GeoPointUpdateToOneWithWhereWithoutLivestockUnitPositionInput
    | undefined;
}

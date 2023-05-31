import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateOrConnectWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateOrConnectWithoutLivestockUnitPositionInput";
import { GeoPointCreateWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateWithoutLivestockUnitPositionInput";
import { GeoPointUpdateWithoutLivestockUnitPositionInput } from "../inputs/GeoPointUpdateWithoutLivestockUnitPositionInput";
import { GeoPointUpsertWithoutLivestockUnitPositionInput } from "../inputs/GeoPointUpsertWithoutLivestockUnitPositionInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType(
  "GeoPointUpdateOneWithoutLivestockUnitPositionNestedInput",
  {
    isAbstract: true,
  }
)
export class GeoPointUpdateOneWithoutLivestockUnitPositionNestedInput {
  @TypeGraphQL.Field(
    (_type) => GeoPointCreateWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  create?: GeoPointCreateWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field(
    (_type) => GeoPointCreateOrConnectWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  connectOrCreate?:
    | GeoPointCreateOrConnectWithoutLivestockUnitPositionInput
    | undefined;

  @TypeGraphQL.Field(
    (_type) => GeoPointUpsertWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  upsert?: GeoPointUpsertWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => GeoPointWhereUniqueInput, {
    nullable: true,
  })
  connect?: GeoPointWhereUniqueInput | undefined;

  @TypeGraphQL.Field(
    (_type) => GeoPointUpdateWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  update?: GeoPointUpdateWithoutLivestockUnitPositionInput | undefined;
}

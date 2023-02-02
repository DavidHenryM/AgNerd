import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateOrConnectWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateOrConnectWithoutLivestockUnitPositionInput";
import { GeoPointCreateWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateWithoutLivestockUnitPositionInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType("GeoPointCreateNestedOneWithoutLivestockUnitPositionInput", {
  isAbstract: true
})
export class GeoPointCreateNestedOneWithoutLivestockUnitPositionInput {
  @TypeGraphQL.Field(_type => GeoPointCreateWithoutLivestockUnitPositionInput, {
    nullable: true
  })
  create?: GeoPointCreateWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field(_type => GeoPointCreateOrConnectWithoutLivestockUnitPositionInput, {
    nullable: true
  })
  connectOrCreate?: GeoPointCreateOrConnectWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field(_type => GeoPointWhereUniqueInput, {
    nullable: true
  })
  connect?: GeoPointWhereUniqueInput | undefined;
}

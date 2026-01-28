import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateWithoutLivestockUnitPositionInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType(
  "GeoPointCreateOrConnectWithoutLivestockUnitPositionInput",
  {},
)
export class GeoPointCreateOrConnectWithoutLivestockUnitPositionInput {
  @TypeGraphQL.Field((_type) => GeoPointWhereUniqueInput, {
    nullable: false,
  })
  where!: GeoPointWhereUniqueInput;

  @TypeGraphQL.Field(
    (_type) => GeoPointCreateWithoutLivestockUnitPositionInput,
    {
      nullable: false,
    },
  )
  create!: GeoPointCreateWithoutLivestockUnitPositionInput;
}

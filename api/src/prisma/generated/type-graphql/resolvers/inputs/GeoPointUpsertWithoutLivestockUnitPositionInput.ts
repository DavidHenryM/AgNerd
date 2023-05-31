import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateWithoutLivestockUnitPositionInput";
import { GeoPointUpdateWithoutLivestockUnitPositionInput } from "../inputs/GeoPointUpdateWithoutLivestockUnitPositionInput";

@TypeGraphQL.InputType("GeoPointUpsertWithoutLivestockUnitPositionInput", {
  isAbstract: true,
})
export class GeoPointUpsertWithoutLivestockUnitPositionInput {
  @TypeGraphQL.Field(
    (_type) => GeoPointUpdateWithoutLivestockUnitPositionInput,
    {
      nullable: false,
    }
  )
  update!: GeoPointUpdateWithoutLivestockUnitPositionInput;

  @TypeGraphQL.Field(
    (_type) => GeoPointCreateWithoutLivestockUnitPositionInput,
    {
      nullable: false,
    }
  )
  create!: GeoPointCreateWithoutLivestockUnitPositionInput;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateWithoutPaddockInput } from "../inputs/GeoPointCreateWithoutPaddockInput";
import { GeoPointUpdateWithoutPaddockInput } from "../inputs/GeoPointUpdateWithoutPaddockInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType("GeoPointUpsertWithWhereUniqueWithoutPaddockInput", {})
export class GeoPointUpsertWithWhereUniqueWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => GeoPointWhereUniqueInput, {
    nullable: false,
  })
  where!: GeoPointWhereUniqueInput;

  @TypeGraphQL.Field((_type) => GeoPointUpdateWithoutPaddockInput, {
    nullable: false,
  })
  update!: GeoPointUpdateWithoutPaddockInput;

  @TypeGraphQL.Field((_type) => GeoPointCreateWithoutPaddockInput, {
    nullable: false,
  })
  create!: GeoPointCreateWithoutPaddockInput;
}

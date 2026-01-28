import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateWithoutPaddockInput } from "../inputs/GeoPointCreateWithoutPaddockInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType("GeoPointCreateOrConnectWithoutPaddockInput", {})
export class GeoPointCreateOrConnectWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => GeoPointWhereUniqueInput, {
    nullable: false,
  })
  where!: GeoPointWhereUniqueInput;

  @TypeGraphQL.Field((_type) => GeoPointCreateWithoutPaddockInput, {
    nullable: false,
  })
  create!: GeoPointCreateWithoutPaddockInput;
}

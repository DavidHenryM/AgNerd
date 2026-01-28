import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointUpdateWithoutPaddockInput } from "../inputs/GeoPointUpdateWithoutPaddockInput";
import { GeoPointWhereUniqueInput } from "../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.InputType("GeoPointUpdateWithWhereUniqueWithoutPaddockInput", {})
export class GeoPointUpdateWithWhereUniqueWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => GeoPointWhereUniqueInput, {
    nullable: false,
  })
  where!: GeoPointWhereUniqueInput;

  @TypeGraphQL.Field((_type) => GeoPointUpdateWithoutPaddockInput, {
    nullable: false,
  })
  data!: GeoPointUpdateWithoutPaddockInput;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointUpdateWithoutLivestockUnitPositionInput } from "../inputs/GeoPointUpdateWithoutLivestockUnitPositionInput";
import { GeoPointWhereInput } from "../inputs/GeoPointWhereInput";

@TypeGraphQL.InputType(
  "GeoPointUpdateToOneWithWhereWithoutLivestockUnitPositionInput",
  {},
)
export class GeoPointUpdateToOneWithWhereWithoutLivestockUnitPositionInput {
  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  where?: GeoPointWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => GeoPointUpdateWithoutLivestockUnitPositionInput,
    {
      nullable: false,
    },
  )
  data!: GeoPointUpdateWithoutLivestockUnitPositionInput;
}

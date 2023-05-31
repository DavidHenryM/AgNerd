import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateNestedOneWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateNestedOneWithoutLivestockUnitPositionInput";

@TypeGraphQL.InputType("LivestockUnitPositionCreateWithoutPaddockInput", {
  isAbstract: true,
})
export class LivestockUnitPositionCreateWithoutPaddockInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  date!: Date;

  @TypeGraphQL.Field(
    (_type) => GeoPointCreateNestedOneWithoutLivestockUnitPositionInput,
    {
      nullable: true,
    }
  )
  location?:
    | GeoPointCreateNestedOneWithoutLivestockUnitPositionInput
    | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GeoPointCreateNestedOneWithoutLivestockUnitPositionInput } from "../inputs/GeoPointCreateNestedOneWithoutLivestockUnitPositionInput";
import { PaddockCreateNestedOneWithoutLivestockUnitPositionInput } from "../inputs/PaddockCreateNestedOneWithoutLivestockUnitPositionInput";

@TypeGraphQL.InputType("LivestockUnitPositionCreateInput", {
  isAbstract: true
})
export class LivestockUnitPositionCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  date!: Date;

  @TypeGraphQL.Field(_type => GeoPointCreateNestedOneWithoutLivestockUnitPositionInput, {
    nullable: true
  })
  location?: GeoPointCreateNestedOneWithoutLivestockUnitPositionInput | undefined;

  @TypeGraphQL.Field(_type => PaddockCreateNestedOneWithoutLivestockUnitPositionInput, {
    nullable: true
  })
  paddock?: PaddockCreateNestedOneWithoutLivestockUnitPositionInput | undefined;
}

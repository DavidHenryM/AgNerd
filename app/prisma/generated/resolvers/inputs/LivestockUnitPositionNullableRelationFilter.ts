import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitPositionWhereInput } from "../inputs/LivestockUnitPositionWhereInput";

@TypeGraphQL.InputType("LivestockUnitPositionNullableRelationFilter", {})
export class LivestockUnitPositionNullableRelationFilter {
  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereInput, {
    nullable: true,
  })
  is?: LivestockUnitPositionWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereInput, {
    nullable: true,
  })
  isNot?: LivestockUnitPositionWhereInput | undefined;
}

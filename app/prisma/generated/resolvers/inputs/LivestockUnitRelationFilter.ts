import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitWhereInput } from "../inputs/LivestockUnitWhereInput";

@TypeGraphQL.InputType("LivestockUnitRelationFilter", {})
export class LivestockUnitRelationFilter {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  is?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  isNot?: LivestockUnitWhereInput | undefined;
}

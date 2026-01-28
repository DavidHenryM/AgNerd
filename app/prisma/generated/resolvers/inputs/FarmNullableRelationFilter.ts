import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmWhereInput } from "../inputs/FarmWhereInput";

@TypeGraphQL.InputType("FarmNullableRelationFilter", {})
export class FarmNullableRelationFilter {
  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  is?: FarmWhereInput | undefined;

  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  isNot?: FarmWhereInput | undefined;
}

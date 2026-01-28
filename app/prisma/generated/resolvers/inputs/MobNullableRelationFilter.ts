import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobWhereInput } from "../inputs/MobWhereInput";

@TypeGraphQL.InputType("MobNullableRelationFilter", {})
export class MobNullableRelationFilter {
  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  is?: MobWhereInput | undefined;

  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  isNot?: MobWhereInput | undefined;
}

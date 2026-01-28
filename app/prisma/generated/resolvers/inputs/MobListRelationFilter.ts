import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobWhereInput } from "../inputs/MobWhereInput";

@TypeGraphQL.InputType("MobListRelationFilter", {})
export class MobListRelationFilter {
  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  every?: MobWhereInput | undefined;

  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  some?: MobWhereInput | undefined;

  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  none?: MobWhereInput | undefined;
}

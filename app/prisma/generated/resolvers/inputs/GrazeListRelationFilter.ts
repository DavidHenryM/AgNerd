import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeWhereInput } from "../inputs/GrazeWhereInput";

@TypeGraphQL.InputType("GrazeListRelationFilter", {})
export class GrazeListRelationFilter {
  @TypeGraphQL.Field((_type) => GrazeWhereInput, {
    nullable: true,
  })
  every?: GrazeWhereInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeWhereInput, {
    nullable: true,
  })
  some?: GrazeWhereInput | undefined;

  @TypeGraphQL.Field((_type) => GrazeWhereInput, {
    nullable: true,
  })
  none?: GrazeWhereInput | undefined;
}

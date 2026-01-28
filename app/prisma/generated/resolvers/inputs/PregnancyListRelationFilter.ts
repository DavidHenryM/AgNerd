import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyWhereInput } from "../inputs/PregnancyWhereInput";

@TypeGraphQL.InputType("PregnancyListRelationFilter", {})
export class PregnancyListRelationFilter {
  @TypeGraphQL.Field((_type) => PregnancyWhereInput, {
    nullable: true,
  })
  every?: PregnancyWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyWhereInput, {
    nullable: true,
  })
  some?: PregnancyWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyWhereInput, {
    nullable: true,
  })
  none?: PregnancyWhereInput | undefined;
}

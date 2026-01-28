import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyWhereInput } from "../inputs/PregnancyWhereInput";

@TypeGraphQL.InputType("PregnancyRelationFilter", {})
export class PregnancyRelationFilter {
  @TypeGraphQL.Field((_type) => PregnancyWhereInput, {
    nullable: true,
  })
  is?: PregnancyWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyWhereInput, {
    nullable: true,
  })
  isNot?: PregnancyWhereInput | undefined;
}

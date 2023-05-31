import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyTestWhereInput } from "../inputs/PregnancyTestWhereInput";

@TypeGraphQL.InputType("PregnancyTestListRelationFilter", {
  isAbstract: true,
})
export class PregnancyTestListRelationFilter {
  @TypeGraphQL.Field((_type) => PregnancyTestWhereInput, {
    nullable: true,
  })
  every?: PregnancyTestWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestWhereInput, {
    nullable: true,
  })
  some?: PregnancyTestWhereInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyTestWhereInput, {
    nullable: true,
  })
  none?: PregnancyTestWhereInput | undefined;
}

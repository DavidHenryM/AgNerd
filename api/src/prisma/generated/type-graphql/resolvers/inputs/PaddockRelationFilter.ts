import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockWhereInput } from "../inputs/PaddockWhereInput";

@TypeGraphQL.InputType("PaddockRelationFilter", {
  isAbstract: true
})
export class PaddockRelationFilter {
  @TypeGraphQL.Field(_type => PaddockWhereInput, {
    nullable: true
  })
  is?: PaddockWhereInput | undefined;

  @TypeGraphQL.Field(_type => PaddockWhereInput, {
    nullable: true
  })
  isNot?: PaddockWhereInput | undefined;
}

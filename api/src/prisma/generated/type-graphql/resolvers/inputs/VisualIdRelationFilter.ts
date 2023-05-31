import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdWhereInput } from "../inputs/VisualIdWhereInput";

@TypeGraphQL.InputType("VisualIdRelationFilter", {
  isAbstract: true,
})
export class VisualIdRelationFilter {
  @TypeGraphQL.Field((_type) => VisualIdWhereInput, {
    nullable: true,
  })
  is?: VisualIdWhereInput | undefined;

  @TypeGraphQL.Field((_type) => VisualIdWhereInput, {
    nullable: true,
  })
  isNot?: VisualIdWhereInput | undefined;
}

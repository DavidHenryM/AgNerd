import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductWhereInput } from "../inputs/ChemicalProductWhereInput";

@TypeGraphQL.InputType("ChemicalProductRelationFilter", {})
export class ChemicalProductRelationFilter {
  @TypeGraphQL.Field((_type) => ChemicalProductWhereInput, {
    nullable: true,
  })
  is?: ChemicalProductWhereInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductWhereInput, {
    nullable: true,
  })
  isNot?: ChemicalProductWhereInput | undefined;
}

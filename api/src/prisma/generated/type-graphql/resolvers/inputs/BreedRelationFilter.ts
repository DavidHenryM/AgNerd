import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedWhereInput } from "../inputs/BreedWhereInput";

@TypeGraphQL.InputType("BreedRelationFilter", {
  isAbstract: true
})
export class BreedRelationFilter {
  @TypeGraphQL.Field(_type => BreedWhereInput, {
    nullable: true
  })
  is?: BreedWhereInput | undefined;

  @TypeGraphQL.Field(_type => BreedWhereInput, {
    nullable: true
  })
  isNot?: BreedWhereInput | undefined;
}

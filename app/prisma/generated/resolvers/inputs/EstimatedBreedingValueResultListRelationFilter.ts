import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueResultWhereInput } from "../inputs/EstimatedBreedingValueResultWhereInput";

@TypeGraphQL.InputType("EstimatedBreedingValueResultListRelationFilter", {})
export class EstimatedBreedingValueResultListRelationFilter {
  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereInput, {
    nullable: true,
  })
  every?: EstimatedBreedingValueResultWhereInput | undefined;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereInput, {
    nullable: true,
  })
  some?: EstimatedBreedingValueResultWhereInput | undefined;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueResultWhereInput, {
    nullable: true,
  })
  none?: EstimatedBreedingValueResultWhereInput | undefined;
}

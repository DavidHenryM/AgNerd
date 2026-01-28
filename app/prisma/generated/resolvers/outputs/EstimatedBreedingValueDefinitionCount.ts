import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionCountResultsArgs } from "./args/EstimatedBreedingValueDefinitionCountResultsArgs";

@TypeGraphQL.ObjectType("EstimatedBreedingValueDefinitionCount", {})
export class EstimatedBreedingValueDefinitionCount {
  results!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "results",
    nullable: false,
  })
  getResults(
    @TypeGraphQL.Root() root: EstimatedBreedingValueDefinitionCount,
    @TypeGraphQL.Args() args: EstimatedBreedingValueDefinitionCountResultsArgs,
  ): number {
    return root.results;
  }
}

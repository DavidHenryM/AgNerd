import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import { EstimatedBreedingValueDefinitionResultsArgs } from "./args/EstimatedBreedingValueDefinitionResultsArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueDefinition)
export class EstimatedBreedingValueDefinitionRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [EstimatedBreedingValueResult], {
    nullable: false,
  })
  async results(
    @TypeGraphQL.Root()
    estimatedBreedingValueDefinition: EstimatedBreedingValueDefinition,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: EstimatedBreedingValueDefinitionResultsArgs,
  ): Promise<EstimatedBreedingValueResult[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .estimatedBreedingValueDefinition.findUniqueOrThrow({
        where: {
          id: estimatedBreedingValueDefinition.id,
        },
      })
      .results({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstEstimatedBreedingValueDefinitionOrThrowArgs } from "./args/FindFirstEstimatedBreedingValueDefinitionOrThrowArgs";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueDefinition)
export class FindFirstEstimatedBreedingValueDefinitionOrThrowResolver {
  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async findFirstEstimatedBreedingValueDefinitionOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args()
    args: FindFirstEstimatedBreedingValueDefinitionOrThrowArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueDefinition.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

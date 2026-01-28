import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstEstimatedBreedingValueResultOrThrowArgs } from "./args/FindFirstEstimatedBreedingValueResultOrThrowArgs";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class FindFirstEstimatedBreedingValueResultOrThrowResolver {
  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async findFirstEstimatedBreedingValueResultOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstEstimatedBreedingValueResultOrThrowArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueResult.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneEstimatedBreedingValueResultArgs } from "./args/UpsertOneEstimatedBreedingValueResultArgs";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class UpsertOneEstimatedBreedingValueResultResolver {
  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueResult, {
    nullable: false,
  })
  async upsertOneEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

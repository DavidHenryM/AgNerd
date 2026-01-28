import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateOneEstimatedBreedingValueResultArgs } from "./args/UpdateOneEstimatedBreedingValueResultArgs";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class UpdateOneEstimatedBreedingValueResultResolver {
  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async updateOneEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

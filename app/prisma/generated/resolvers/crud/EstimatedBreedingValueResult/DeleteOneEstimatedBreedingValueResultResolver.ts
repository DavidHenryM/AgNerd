import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteOneEstimatedBreedingValueResultArgs } from "./args/DeleteOneEstimatedBreedingValueResultArgs";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class DeleteOneEstimatedBreedingValueResultResolver {
  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async deleteOneEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

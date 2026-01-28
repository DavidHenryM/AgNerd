import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateOneEstimatedBreedingValueResultArgs } from "./args/CreateOneEstimatedBreedingValueResultArgs";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class CreateOneEstimatedBreedingValueResultResolver {
  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueResult, {
    nullable: false,
  })
  async createOneEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

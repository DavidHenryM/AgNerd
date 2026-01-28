import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateEstimatedBreedingValueResultArgs } from "./args/AggregateEstimatedBreedingValueResultArgs";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import { AggregateEstimatedBreedingValueResult } from "../../outputs/AggregateEstimatedBreedingValueResult";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class AggregateEstimatedBreedingValueResultResolver {
  @TypeGraphQL.Query((_returns) => AggregateEstimatedBreedingValueResult, {
    nullable: false,
  })
  async aggregateEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateEstimatedBreedingValueResultArgs,
  ): Promise<AggregateEstimatedBreedingValueResult> {
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

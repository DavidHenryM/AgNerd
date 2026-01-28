import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateEstimatedBreedingValueDefinitionArgs } from "./args/AggregateEstimatedBreedingValueDefinitionArgs";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import { AggregateEstimatedBreedingValueDefinition } from "../../outputs/AggregateEstimatedBreedingValueDefinition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueDefinition)
export class AggregateEstimatedBreedingValueDefinitionResolver {
  @TypeGraphQL.Query((_returns) => AggregateEstimatedBreedingValueDefinition, {
    nullable: false,
  })
  async aggregateEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateEstimatedBreedingValueDefinitionArgs,
  ): Promise<AggregateEstimatedBreedingValueDefinition> {
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.aggregate(
      {
        ...args,
        ...transformInfoIntoPrismaArgs(info),
      },
    );
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneEstimatedBreedingValueDefinitionArgs } from "./args/UpsertOneEstimatedBreedingValueDefinitionArgs";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueDefinition)
export class UpsertOneEstimatedBreedingValueDefinitionResolver {
  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueDefinition, {
    nullable: false,
  })
  async upsertOneEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

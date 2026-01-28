import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstEstimatedBreedingValueDefinitionArgs } from "./args/FindFirstEstimatedBreedingValueDefinitionArgs";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueDefinition)
export class FindFirstEstimatedBreedingValueDefinitionResolver {
  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async findFirstEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.findFirst(
      {
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      },
    );
  }
}

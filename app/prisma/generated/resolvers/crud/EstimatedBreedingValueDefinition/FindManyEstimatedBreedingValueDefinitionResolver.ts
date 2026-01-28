import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindManyEstimatedBreedingValueDefinitionArgs } from "./args/FindManyEstimatedBreedingValueDefinitionArgs";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueDefinition)
export class FindManyEstimatedBreedingValueDefinitionResolver {
  @TypeGraphQL.Query((_returns) => [EstimatedBreedingValueDefinition], {
    nullable: false,
  })
  async estimatedBreedingValueDefinitions(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

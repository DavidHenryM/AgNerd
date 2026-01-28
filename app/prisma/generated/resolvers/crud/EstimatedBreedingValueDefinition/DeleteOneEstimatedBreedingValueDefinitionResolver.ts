import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteOneEstimatedBreedingValueDefinitionArgs } from "./args/DeleteOneEstimatedBreedingValueDefinitionArgs";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueDefinition)
export class DeleteOneEstimatedBreedingValueDefinitionResolver {
  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async deleteOneEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

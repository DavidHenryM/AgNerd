import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateOneVisualIdArgs } from "./args/UpdateOneVisualIdArgs";
import { VisualId } from "../../../models/VisualId";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => VisualId)
export class UpdateOneVisualIdResolver {
  @TypeGraphQL.Mutation((_returns) => VisualId, {
    nullable: true,
  })
  async updateOneVisualId(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneVisualIdArgs
  ): Promise<VisualId | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).visualId.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

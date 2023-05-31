import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindManyVisualIdArgs } from "./args/FindManyVisualIdArgs";
import { VisualId } from "../../../models/VisualId";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => VisualId)
export class FindManyVisualIdResolver {
  @TypeGraphQL.Query((_returns) => [VisualId], {
    nullable: false,
  })
  async visualIds(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyVisualIdArgs
  ): Promise<VisualId[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).visualId.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

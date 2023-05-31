import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneVisualIdArgs } from "./args/UpsertOneVisualIdArgs";
import { VisualId } from "../../../models/VisualId";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => VisualId)
export class UpsertOneVisualIdResolver {
  @TypeGraphQL.Mutation((_returns) => VisualId, {
    nullable: false,
  })
  async upsertOneVisualId(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneVisualIdArgs
  ): Promise<VisualId> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).visualId.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateOneVisualIdArgs } from "./args/CreateOneVisualIdArgs";
import { VisualId } from "../../../models/VisualId";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => VisualId)
export class CreateOneVisualIdResolver {
  @TypeGraphQL.Mutation((_returns) => VisualId, {
    nullable: false,
  })
  async createOneVisualId(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneVisualIdArgs
  ): Promise<VisualId> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).visualId.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

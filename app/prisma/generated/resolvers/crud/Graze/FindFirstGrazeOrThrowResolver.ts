import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstGrazeOrThrowArgs } from "./args/FindFirstGrazeOrThrowArgs";
import { Graze } from "../../../models/Graze";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Graze)
export class FindFirstGrazeOrThrowResolver {
  @TypeGraphQL.Query((_returns) => Graze, {
    nullable: true,
  })
  async findFirstGrazeOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstGrazeOrThrowArgs,
  ): Promise<Graze | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).graze.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

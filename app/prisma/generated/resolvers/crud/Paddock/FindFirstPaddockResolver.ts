import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstPaddockArgs } from "./args/FindFirstPaddockArgs";
import { Paddock } from "../../../models/Paddock";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Paddock)
export class FindFirstPaddockResolver {
  @TypeGraphQL.Query((_returns) => Paddock, {
    nullable: true,
  })
  async findFirstPaddock(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstPaddockArgs,
  ): Promise<Paddock | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).paddock.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

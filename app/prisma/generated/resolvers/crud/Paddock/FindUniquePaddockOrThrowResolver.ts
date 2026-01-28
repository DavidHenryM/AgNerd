import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniquePaddockOrThrowArgs } from "./args/FindUniquePaddockOrThrowArgs";
import { Paddock } from "../../../models/Paddock";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Paddock)
export class FindUniquePaddockOrThrowResolver {
  @TypeGraphQL.Query((_returns) => Paddock, {
    nullable: true,
  })
  async getPaddock(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniquePaddockOrThrowArgs,
  ): Promise<Paddock | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).paddock.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueFarmOrThrowArgs } from "./args/FindUniqueFarmOrThrowArgs";
import { Farm } from "../../../models/Farm";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Farm)
export class FindUniqueFarmOrThrowResolver {
  @TypeGraphQL.Query((_returns) => Farm, {
    nullable: true,
  })
  async getFarm(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueFarmOrThrowArgs,
  ): Promise<Farm | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).farm.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

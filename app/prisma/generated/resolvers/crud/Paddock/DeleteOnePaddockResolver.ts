import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteOnePaddockArgs } from "./args/DeleteOnePaddockArgs";
import { Paddock } from "../../../models/Paddock";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Paddock)
export class DeleteOnePaddockResolver {
  @TypeGraphQL.Mutation((_returns) => Paddock, {
    nullable: true,
  })
  async deleteOnePaddock(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOnePaddockArgs,
  ): Promise<Paddock | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).paddock.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

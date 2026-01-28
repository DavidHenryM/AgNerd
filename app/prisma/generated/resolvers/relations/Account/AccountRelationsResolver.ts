import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Account } from "../../../models/Account";
import { User } from "../../../models/User";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Account)
export class AccountRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => User, {
    nullable: false,
  })
  async user(
    @TypeGraphQL.Root() account: Account,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .account.findUniqueOrThrow({
        where: {
          id: account.id,
        },
      })
      .user({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

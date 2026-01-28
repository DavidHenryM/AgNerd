import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateAccountArgs } from "./args/AggregateAccountArgs";
import { Account } from "../../../models/Account";
import { AggregateAccount } from "../../outputs/AggregateAccount";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Account)
export class AggregateAccountResolver {
  @TypeGraphQL.Query((_returns) => AggregateAccount, {
    nullable: false,
  })
  async aggregateAccount(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateAccountArgs,
  ): Promise<AggregateAccount> {
    return getPrismaFromContext(ctx).account.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

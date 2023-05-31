import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregatePaddockArgs } from "./args/AggregatePaddockArgs";
import { Paddock } from "../../../models/Paddock";
import { AggregatePaddock } from "../../outputs/AggregatePaddock";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Paddock)
export class AggregatePaddockResolver {
  @TypeGraphQL.Query((_returns) => AggregatePaddock, {
    nullable: false,
  })
  async aggregatePaddock(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregatePaddockArgs
  ): Promise<AggregatePaddock> {
    return getPrismaFromContext(ctx).paddock.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

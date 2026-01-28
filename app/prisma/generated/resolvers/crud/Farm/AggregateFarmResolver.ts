import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateFarmArgs } from "./args/AggregateFarmArgs";
import { Farm } from "../../../models/Farm";
import { AggregateFarm } from "../../outputs/AggregateFarm";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Farm)
export class AggregateFarmResolver {
  @TypeGraphQL.Query((_returns) => AggregateFarm, {
    nullable: false,
  })
  async aggregateFarm(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateFarmArgs,
  ): Promise<AggregateFarm> {
    return getPrismaFromContext(ctx).farm.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

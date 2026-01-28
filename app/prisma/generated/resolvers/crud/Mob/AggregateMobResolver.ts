import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateMobArgs } from "./args/AggregateMobArgs";
import { Mob } from "../../../models/Mob";
import { AggregateMob } from "../../outputs/AggregateMob";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Mob)
export class AggregateMobResolver {
  @TypeGraphQL.Query((_returns) => AggregateMob, {
    nullable: false,
  })
  async aggregateMob(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateMobArgs,
  ): Promise<AggregateMob> {
    return getPrismaFromContext(ctx).mob.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

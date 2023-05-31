import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregatePregnancyArgs } from "./args/AggregatePregnancyArgs";
import { Pregnancy } from "../../../models/Pregnancy";
import { AggregatePregnancy } from "../../outputs/AggregatePregnancy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Pregnancy)
export class AggregatePregnancyResolver {
  @TypeGraphQL.Query((_returns) => AggregatePregnancy, {
    nullable: false,
  })
  async aggregatePregnancy(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregatePregnancyArgs
  ): Promise<AggregatePregnancy> {
    return getPrismaFromContext(ctx).pregnancy.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

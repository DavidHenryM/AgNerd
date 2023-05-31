import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateGrazeArgs } from "./args/AggregateGrazeArgs";
import { Graze } from "../../../models/Graze";
import { AggregateGraze } from "../../outputs/AggregateGraze";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Graze)
export class AggregateGrazeResolver {
  @TypeGraphQL.Query((_returns) => AggregateGraze, {
    nullable: false,
  })
  async aggregateGraze(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateGrazeArgs
  ): Promise<AggregateGraze> {
    return getPrismaFromContext(ctx).graze.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}

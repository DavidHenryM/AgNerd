import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregatePaddockArgs } from "./args/AggregatePaddockArgs";
import { Paddock } from "../../../models/Paddock";
import { AggregatePaddock } from "../../outputs/AggregatePaddock";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Paddock)
export class AggregatePaddockResolver {
  @TypeGraphQL.Query(_returns => AggregatePaddock, {
    nullable: false
  })
  async aggregatePaddock(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregatePaddockArgs): Promise<AggregatePaddock> {
    return getPrismaFromContext(ctx).paddock.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateVisualIdArgs } from "./args/AggregateVisualIdArgs";
import { VisualId } from "../../../models/VisualId";
import { AggregateVisualId } from "../../outputs/AggregateVisualId";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => VisualId)
export class AggregateVisualIdResolver {
  @TypeGraphQL.Query(_returns => AggregateVisualId, {
    nullable: false
  })
  async aggregateVisualId(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateVisualIdArgs): Promise<AggregateVisualId> {
    return getPrismaFromContext(ctx).visualId.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}

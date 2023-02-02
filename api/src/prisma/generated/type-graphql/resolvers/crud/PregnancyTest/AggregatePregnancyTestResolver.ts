import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregatePregnancyTestArgs } from "./args/AggregatePregnancyTestArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { AggregatePregnancyTest } from "../../outputs/AggregatePregnancyTest";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => PregnancyTest)
export class AggregatePregnancyTestResolver {
  @TypeGraphQL.Query(_returns => AggregatePregnancyTest, {
    nullable: false
  })
  async aggregatePregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregatePregnancyTestArgs): Promise<AggregatePregnancyTest> {
    return getPrismaFromContext(ctx).pregnancyTest.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}

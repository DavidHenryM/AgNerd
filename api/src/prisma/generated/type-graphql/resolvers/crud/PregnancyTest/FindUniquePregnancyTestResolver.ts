import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindUniquePregnancyTestArgs } from "./args/FindUniquePregnancyTestArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => PregnancyTest)
export class FindUniquePregnancyTestResolver {
  @TypeGraphQL.Query(_returns => PregnancyTest, {
    nullable: true
  })
  async pregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniquePregnancyTestArgs): Promise<PregnancyTest | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

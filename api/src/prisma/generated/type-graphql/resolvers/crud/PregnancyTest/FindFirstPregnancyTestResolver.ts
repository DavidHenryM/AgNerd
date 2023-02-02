import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstPregnancyTestArgs } from "./args/FindFirstPregnancyTestArgs";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => PregnancyTest)
export class FindFirstPregnancyTestResolver {
  @TypeGraphQL.Query(_returns => PregnancyTest, {
    nullable: true
  })
  async findFirstPregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstPregnancyTestArgs): Promise<PregnancyTest | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

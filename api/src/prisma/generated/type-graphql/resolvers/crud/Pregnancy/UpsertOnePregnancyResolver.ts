import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpsertOnePregnancyArgs } from "./args/UpsertOnePregnancyArgs";
import { Pregnancy } from "../../../models/Pregnancy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Pregnancy)
export class UpsertOnePregnancyResolver {
  @TypeGraphQL.Mutation(_returns => Pregnancy, {
    nullable: false
  })
  async upsertOnePregnancy(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOnePregnancyArgs): Promise<Pregnancy> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancy.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

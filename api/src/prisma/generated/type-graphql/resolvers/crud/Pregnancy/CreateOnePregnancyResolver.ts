import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { CreateOnePregnancyArgs } from "./args/CreateOnePregnancyArgs";
import { Pregnancy } from "../../../models/Pregnancy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Pregnancy)
export class CreateOnePregnancyResolver {
  @TypeGraphQL.Mutation(_returns => Pregnancy, {
    nullable: false
  })
  async createOnePregnancy(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOnePregnancyArgs): Promise<Pregnancy> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancy.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { DeleteOnePregnancyArgs } from "./args/DeleteOnePregnancyArgs";
import { Pregnancy } from "../../../models/Pregnancy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Pregnancy)
export class DeleteOnePregnancyResolver {
  @TypeGraphQL.Mutation(_returns => Pregnancy, {
    nullable: true
  })
  async deleteOnePregnancy(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOnePregnancyArgs): Promise<Pregnancy | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancy.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

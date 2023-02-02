import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { DeleteOneVisualIdArgs } from "./args/DeleteOneVisualIdArgs";
import { VisualId } from "../../../models/VisualId";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => VisualId)
export class DeleteOneVisualIdResolver {
  @TypeGraphQL.Mutation(_returns => VisualId, {
    nullable: true
  })
  async deleteOneVisualId(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOneVisualIdArgs): Promise<VisualId | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).visualId.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

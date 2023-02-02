import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpdateOneVisualIdArgs } from "./args/UpdateOneVisualIdArgs";
import { VisualId } from "../../../models/VisualId";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => VisualId)
export class UpdateOneVisualIdResolver {
  @TypeGraphQL.Mutation(_returns => VisualId, {
    nullable: true
  })
  async updateOneVisualId(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneVisualIdArgs): Promise<VisualId | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).visualId.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

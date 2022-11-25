import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { DeleteOneLivestockUnitArgs } from "./args/DeleteOneLivestockUnitArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LivestockUnit)
export class DeleteOneLivestockUnitResolver {
  @TypeGraphQL.Mutation(_returns => LivestockUnit, {
    nullable: true
  })
  async deleteOneLivestockUnit(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOneLivestockUnitArgs): Promise<LivestockUnit | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).livestockUnit.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

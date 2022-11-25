import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstLivestockUnitArgs } from "./args/FindFirstLivestockUnitArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LivestockUnit)
export class FindFirstLivestockUnitResolver {
  @TypeGraphQL.Query(_returns => LivestockUnit, {
    nullable: true
  })
  async findFirstLivestockUnit(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstLivestockUnitArgs): Promise<LivestockUnit | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).livestockUnit.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindManyGeoPointArgs } from "./args/FindManyGeoPointArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => GeoPoint)
export class FindManyGeoPointResolver {
  @TypeGraphQL.Query(_returns => [GeoPoint], {
    nullable: false
  })
  async geoPoints(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyGeoPointArgs): Promise<GeoPoint[]> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).geoPoint.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

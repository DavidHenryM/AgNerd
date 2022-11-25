import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpsertOneGeoPointArgs } from "./args/UpsertOneGeoPointArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => GeoPoint)
export class UpsertOneGeoPointResolver {
  @TypeGraphQL.Mutation(_returns => GeoPoint, {
    nullable: false
  })
  async upsertOneGeoPoint(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOneGeoPointArgs): Promise<GeoPoint> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).geoPoint.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

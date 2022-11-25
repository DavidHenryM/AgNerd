import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateGeoPointArgs } from "./args/AggregateGeoPointArgs";
import { GeoPoint } from "../../../models/GeoPoint";
import { AggregateGeoPoint } from "../../outputs/AggregateGeoPoint";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => GeoPoint)
export class AggregateGeoPointResolver {
  @TypeGraphQL.Query(_returns => AggregateGeoPoint, {
    nullable: false
  })
  async aggregateGeoPoint(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateGeoPointArgs): Promise<AggregateGeoPoint> {
    return getPrismaFromContext(ctx).geoPoint.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import { GeoPoint } from "../../../models/GeoPoint";
import { Paddock } from "../../../models/Paddock";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => GeoPoint)
export class GeoPointRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Paddock, {
    nullable: false
  })
  async paddock(@TypeGraphQL.Root() geoPoint: GeoPoint, @TypeGraphQL.Ctx() ctx: any): Promise<Paddock> {
    return getPrismaFromContext(ctx).geoPoint.findUnique({
      where: {
        id: geoPoint.id,
      },
    }).paddock({});
  }
}

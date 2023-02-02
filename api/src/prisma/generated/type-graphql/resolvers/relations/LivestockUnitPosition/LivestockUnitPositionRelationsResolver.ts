import * as TypeGraphQL from "type-graphql";
import { GeoPoint } from "../../../models/GeoPoint";
import { LivestockUnitPosition } from "../../../models/LivestockUnitPosition";
import { Paddock } from "../../../models/Paddock";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LivestockUnitPosition)
export class LivestockUnitPositionRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => GeoPoint, {
    nullable: true
  })
  async location(@TypeGraphQL.Root() livestockUnitPosition: LivestockUnitPosition, @TypeGraphQL.Ctx() ctx: any): Promise<GeoPoint | null> {
    return getPrismaFromContext(ctx).livestockUnitPosition.findUnique({
      where: {
        id: livestockUnitPosition.id,
      },
    }).location({});
  }

  @TypeGraphQL.FieldResolver(_type => Paddock, {
    nullable: true
  })
  async paddock(@TypeGraphQL.Root() livestockUnitPosition: LivestockUnitPosition, @TypeGraphQL.Ctx() ctx: any): Promise<Paddock | null> {
    return getPrismaFromContext(ctx).livestockUnitPosition.findUnique({
      where: {
        id: livestockUnitPosition.id,
      },
    }).paddock({});
  }
}

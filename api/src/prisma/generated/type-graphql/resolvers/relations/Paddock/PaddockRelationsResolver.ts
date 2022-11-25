import * as TypeGraphQL from "type-graphql";
import { GeoPoint } from "../../../models/GeoPoint";
import { Graze } from "../../../models/Graze";
import { Paddock } from "../../../models/Paddock";
import { PaddockGrazeArgs } from "./args/PaddockGrazeArgs";
import { PaddockPolygonArgs } from "./args/PaddockPolygonArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Paddock)
export class PaddockRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [GeoPoint], {
    nullable: false
  })
  async polygon(@TypeGraphQL.Root() paddock: Paddock, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: PaddockPolygonArgs): Promise<GeoPoint[]> {
    return getPrismaFromContext(ctx).paddock.findUnique({
      where: {
        id: paddock.id,
      },
    }).polygon(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Graze], {
    nullable: false
  })
  async graze(@TypeGraphQL.Root() paddock: Paddock, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: PaddockGrazeArgs): Promise<Graze[]> {
    return getPrismaFromContext(ctx).paddock.findUnique({
      where: {
        id: paddock.id,
      },
    }).graze(args);
  }
}

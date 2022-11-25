import * as TypeGraphQL from "type-graphql";
import { Graze } from "../../../models/Graze";
import { Mob } from "../../../models/Mob";
import { Paddock } from "../../../models/Paddock";
import { GrazeMobArgs } from "./args/GrazeMobArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Graze)
export class GrazeRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Paddock, {
    nullable: false
  })
  async paddock(@TypeGraphQL.Root() graze: Graze, @TypeGraphQL.Ctx() ctx: any): Promise<Paddock> {
    return getPrismaFromContext(ctx).graze.findUnique({
      where: {
        id: graze.id,
      },
    }).paddock({});
  }

  @TypeGraphQL.FieldResolver(_type => [Mob], {
    nullable: false
  })
  async mob(@TypeGraphQL.Root() graze: Graze, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: GrazeMobArgs): Promise<Mob[]> {
    return getPrismaFromContext(ctx).graze.findUnique({
      where: {
        id: graze.id,
      },
    }).mob(args);
  }
}

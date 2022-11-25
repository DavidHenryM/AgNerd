import * as TypeGraphQL from "type-graphql";
import { Graze } from "../../../models/Graze";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { Mob } from "../../../models/Mob";
import { MobGrazeArgs } from "./args/MobGrazeArgs";
import { MobMembersArgs } from "./args/MobMembersArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Mob)
export class MobRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [LivestockUnit], {
    nullable: false
  })
  async members(@TypeGraphQL.Root() mob: Mob, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: MobMembersArgs): Promise<LivestockUnit[]> {
    return getPrismaFromContext(ctx).mob.findUnique({
      where: {
        id: mob.id,
      },
    }).members(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Graze], {
    nullable: false
  })
  async graze(@TypeGraphQL.Root() mob: Mob, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: MobGrazeArgs): Promise<Graze[]> {
    return getPrismaFromContext(ctx).mob.findUnique({
      where: {
        id: mob.id,
      },
    }).graze(args);
  }
}

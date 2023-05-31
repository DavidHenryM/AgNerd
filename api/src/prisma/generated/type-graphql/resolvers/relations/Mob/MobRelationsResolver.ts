import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Graze } from "../../../models/Graze";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { Mob } from "../../../models/Mob";
import { MobGrazeArgs } from "./args/MobGrazeArgs";
import { MobMembersArgs } from "./args/MobMembersArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Mob)
export class MobRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [LivestockUnit], {
    nullable: false,
  })
  async members(
    @TypeGraphQL.Root() mob: Mob,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: MobMembersArgs
  ): Promise<LivestockUnit[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .mob.findUniqueOrThrow({
        where: {
          id: mob.id,
        },
      })
      .members({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [Graze], {
    nullable: false,
  })
  async graze(
    @TypeGraphQL.Root() mob: Mob,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: MobGrazeArgs
  ): Promise<Graze[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .mob.findUniqueOrThrow({
        where: {
          id: mob.id,
        },
      })
      .graze({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

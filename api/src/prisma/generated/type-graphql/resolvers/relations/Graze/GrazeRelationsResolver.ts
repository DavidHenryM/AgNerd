import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Graze } from "../../../models/Graze";
import { Mob } from "../../../models/Mob";
import { Paddock } from "../../../models/Paddock";
import { GrazeMobArgs } from "./args/GrazeMobArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Graze)
export class GrazeRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Paddock, {
    nullable: false,
  })
  async paddock(
    @TypeGraphQL.Root() graze: Graze,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<Paddock> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .graze.findUniqueOrThrow({
        where: {
          id: graze.id,
        },
      })
      .paddock({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [Mob], {
    nullable: false,
  })
  async mob(
    @TypeGraphQL.Root() graze: Graze,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GrazeMobArgs
  ): Promise<Mob[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .graze.findUniqueOrThrow({
        where: {
          id: graze.id,
        },
      })
      .mob({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

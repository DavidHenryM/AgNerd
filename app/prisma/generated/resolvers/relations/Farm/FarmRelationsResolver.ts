import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Farm } from "../../../models/Farm";
import { User } from "../../../models/User";
import { FarmUsersArgs } from "./args/FarmUsersArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Farm)
export class FarmRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [User], {
    nullable: false,
  })
  async users(
    @TypeGraphQL.Root() farm: Farm,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FarmUsersArgs,
  ): Promise<User[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .farm.findUniqueOrThrow({
        where: {
          id: farm.id,
        },
      })
      .users({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

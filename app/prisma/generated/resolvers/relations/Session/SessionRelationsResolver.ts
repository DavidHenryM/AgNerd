import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Session } from "../../../models/Session";
import { User } from "../../../models/User";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Session)
export class SessionRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => User, {
    nullable: false,
  })
  async user(
    @TypeGraphQL.Root() session: Session,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .session.findUniqueOrThrow({
        where: {
          id: session.id,
        },
      })
      .user({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

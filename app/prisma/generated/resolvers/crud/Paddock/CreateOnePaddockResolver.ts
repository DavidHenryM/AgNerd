import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateOnePaddockArgs } from "./args/CreateOnePaddockArgs";
import { Paddock } from "../../../models/Paddock";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Paddock)
export class CreateOnePaddockResolver {
  @TypeGraphQL.Mutation((_returns) => Paddock, {
    nullable: false,
  })
  async createOnePaddock(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOnePaddockArgs,
  ): Promise<Paddock> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).paddock.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

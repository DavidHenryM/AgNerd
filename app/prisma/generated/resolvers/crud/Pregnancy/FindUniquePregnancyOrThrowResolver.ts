import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniquePregnancyOrThrowArgs } from "./args/FindUniquePregnancyOrThrowArgs";
import { Pregnancy } from "../../../models/Pregnancy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Pregnancy)
export class FindUniquePregnancyOrThrowResolver {
  @TypeGraphQL.Query((_returns) => Pregnancy, {
    nullable: true,
  })
  async getPregnancy(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniquePregnancyOrThrowArgs,
  ): Promise<Pregnancy | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).pregnancy.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

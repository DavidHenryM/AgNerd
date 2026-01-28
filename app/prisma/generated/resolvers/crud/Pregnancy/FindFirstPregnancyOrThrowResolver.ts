import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstPregnancyOrThrowArgs } from "./args/FindFirstPregnancyOrThrowArgs";
import { Pregnancy } from "../../../models/Pregnancy";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Pregnancy)
export class FindFirstPregnancyOrThrowResolver {
  @TypeGraphQL.Query((_returns) => Pregnancy, {
    nullable: true,
  })
  async findFirstPregnancyOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstPregnancyOrThrowArgs,
  ): Promise<Pregnancy | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).pregnancy.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

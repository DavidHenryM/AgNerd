import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { Pregnancy } from "../../../models/Pregnancy";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { PregnancyParentsArgs } from "./args/PregnancyParentsArgs";
import { PregnancyPregnancyTestArgs } from "./args/PregnancyPregnancyTestArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => Pregnancy)
export class PregnancyRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [LivestockUnit], {
    nullable: false,
  })
  async parents(
    @TypeGraphQL.Root() pregnancy: Pregnancy,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: PregnancyParentsArgs
  ): Promise<LivestockUnit[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .pregnancy.findUniqueOrThrow({
        where: {
          id: pregnancy.id,
        },
      })
      .parents({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [PregnancyTest], {
    nullable: false,
  })
  async pregnancyTest(
    @TypeGraphQL.Root() pregnancy: Pregnancy,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: PregnancyPregnancyTestArgs
  ): Promise<PregnancyTest[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .pregnancy.findUniqueOrThrow({
        where: {
          id: pregnancy.id,
        },
      })
      .pregnancyTest({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

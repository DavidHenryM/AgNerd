import * as TypeGraphQL from "type-graphql";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { Pregnancy } from "../../../models/Pregnancy";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { PregnancyParentsArgs } from "./args/PregnancyParentsArgs";
import { PregnancyPregnancyTestArgs } from "./args/PregnancyPregnancyTestArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Pregnancy)
export class PregnancyRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [LivestockUnit], {
    nullable: false
  })
  async parents(@TypeGraphQL.Root() pregnancy: Pregnancy, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: PregnancyParentsArgs): Promise<LivestockUnit[]> {
    return getPrismaFromContext(ctx).pregnancy.findUnique({
      where: {
        id: pregnancy.id,
      },
    }).parents(args);
  }

  @TypeGraphQL.FieldResolver(_type => [PregnancyTest], {
    nullable: false
  })
  async pregnancyTest(@TypeGraphQL.Root() pregnancy: Pregnancy, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: PregnancyPregnancyTestArgs): Promise<PregnancyTest[]> {
    return getPrismaFromContext(ctx).pregnancy.findUnique({
      where: {
        id: pregnancy.id,
      },
    }).pregnancyTest(args);
  }
}

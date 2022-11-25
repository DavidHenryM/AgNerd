import * as TypeGraphQL from "type-graphql";
import { Breed } from "../../../models/Breed";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { Mob } from "../../../models/Mob";
import { WeightRecord } from "../../../models/WeightRecord";
import { LivestockUnitWeightsArgs } from "./args/LivestockUnitWeightsArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LivestockUnit)
export class LivestockUnitRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Breed, {
    nullable: true
  })
  async breed(@TypeGraphQL.Root() livestockUnit: LivestockUnit, @TypeGraphQL.Ctx() ctx: any): Promise<Breed | null> {
    return getPrismaFromContext(ctx).livestockUnit.findUnique({
      where: {
        id: livestockUnit.id,
      },
    }).breed({});
  }

  @TypeGraphQL.FieldResolver(_type => LivestockUnit, {
    nullable: true
  })
  async sire(@TypeGraphQL.Root() livestockUnit: LivestockUnit, @TypeGraphQL.Ctx() ctx: any): Promise<LivestockUnit | null> {
    return getPrismaFromContext(ctx).livestockUnit.findUnique({
      where: {
        id: livestockUnit.id,
      },
    }).sire({});
  }

  @TypeGraphQL.FieldResolver(_type => LivestockUnit, {
    nullable: true
  })
  async dam(@TypeGraphQL.Root() livestockUnit: LivestockUnit, @TypeGraphQL.Ctx() ctx: any): Promise<LivestockUnit | null> {
    return getPrismaFromContext(ctx).livestockUnit.findUnique({
      where: {
        id: livestockUnit.id,
      },
    }).dam({});
  }

  @TypeGraphQL.FieldResolver(_type => Mob, {
    nullable: false
  })
  async mob(@TypeGraphQL.Root() livestockUnit: LivestockUnit, @TypeGraphQL.Ctx() ctx: any): Promise<Mob> {
    return getPrismaFromContext(ctx).livestockUnit.findUnique({
      where: {
        id: livestockUnit.id,
      },
    }).mob({});
  }

  @TypeGraphQL.FieldResolver(_type => [WeightRecord], {
    nullable: false
  })
  async weights(@TypeGraphQL.Root() livestockUnit: LivestockUnit, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: LivestockUnitWeightsArgs): Promise<WeightRecord[]> {
    return getPrismaFromContext(ctx).livestockUnit.findUnique({
      where: {
        id: livestockUnit.id,
      },
    }).weights(args);
  }
}

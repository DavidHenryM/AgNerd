import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Breed } from "../../../models/Breed";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { Mob } from "../../../models/Mob";
import { Pregnancy } from "../../../models/Pregnancy";
import { VisualId } from "../../../models/VisualId";
import { WeightRecord } from "../../../models/WeightRecord";
import { LivestockUnitPregnancyArgs } from "./args/LivestockUnitPregnancyArgs";
import { LivestockUnitTreatmentsArgs } from "./args/LivestockUnitTreatmentsArgs";
import { LivestockUnitWeightsArgs } from "./args/LivestockUnitWeightsArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnit)
export class LivestockUnitRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => VisualId, {
    nullable: true,
  })
  async visualid(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<VisualId | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .visualid({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => Breed, {
    nullable: true,
  })
  async breed(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<Breed | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .breed({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: true,
  })
  async sire(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<LivestockUnit | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .sire({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: true,
  })
  async dam(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<LivestockUnit | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .dam({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => Mob, {
    nullable: false,
  })
  async mob(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo
  ): Promise<Mob> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .mob({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [Pregnancy], {
    nullable: false,
  })
  async pregnancy(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitPregnancyArgs
  ): Promise<Pregnancy[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .pregnancy({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [WeightRecord], {
    nullable: false,
  })
  async weights(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitWeightsArgs
  ): Promise<WeightRecord[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .weights({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [ChemicalTreatment], {
    nullable: false,
  })
  async treatments(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitTreatmentsArgs
  ): Promise<ChemicalTreatment[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .treatments({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Breed } from "../../../models/Breed";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { Mob } from "../../../models/Mob";
import { Pregnancy } from "../../../models/Pregnancy";
import { WeightRecord } from "../../../models/WeightRecord";
import { LivestockUnitBirthedArgs } from "./args/LivestockUnitBirthedArgs";
import { LivestockUnitBreedArgs } from "./args/LivestockUnitBreedArgs";
import { LivestockUnitDamArgs } from "./args/LivestockUnitDamArgs";
import { LivestockUnitEstimatedBreedingValueResultArgs } from "./args/LivestockUnitEstimatedBreedingValueResultArgs";
import { LivestockUnitMobArgs } from "./args/LivestockUnitMobArgs";
import { LivestockUnitPregnancyArgs } from "./args/LivestockUnitPregnancyArgs";
import { LivestockUnitSireArgs } from "./args/LivestockUnitSireArgs";
import { LivestockUnitSiredArgs } from "./args/LivestockUnitSiredArgs";
import { LivestockUnitTreatmentsArgs } from "./args/LivestockUnitTreatmentsArgs";
import { LivestockUnitWeightsArgs } from "./args/LivestockUnitWeightsArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LivestockUnit)
export class LivestockUnitRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Breed, {
    nullable: true,
  })
  async breed(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitBreedArgs,
  ): Promise<Breed | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .breed({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: true,
  })
  async sire(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitSireArgs,
  ): Promise<LivestockUnit | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .sire({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [LivestockUnit], {
    nullable: false,
  })
  async sired(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitSiredArgs,
  ): Promise<LivestockUnit[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .sired({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: true,
  })
  async dam(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitDamArgs,
  ): Promise<LivestockUnit | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .dam({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => [LivestockUnit], {
    nullable: false,
  })
  async birthed(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitBirthedArgs,
  ): Promise<LivestockUnit[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .birthed({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => Mob, {
    nullable: true,
  })
  async mob(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitMobArgs,
  ): Promise<Mob | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .mob({
        ...args,
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
    @TypeGraphQL.Args() args: LivestockUnitPregnancyArgs,
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
    @TypeGraphQL.Args() args: LivestockUnitWeightsArgs,
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
    @TypeGraphQL.Args() args: LivestockUnitTreatmentsArgs,
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

  @TypeGraphQL.FieldResolver((_type) => [EstimatedBreedingValueResult], {
    nullable: false,
  })
  async estimatedBreedingValueResult(
    @TypeGraphQL.Root() livestockUnit: LivestockUnit,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LivestockUnitEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .livestockUnit.findUniqueOrThrow({
        where: {
          id: livestockUnit.id,
        },
      })
      .estimatedBreedingValueResult({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

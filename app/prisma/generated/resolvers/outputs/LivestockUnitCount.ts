import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCountBirthedArgs } from "./args/LivestockUnitCountBirthedArgs";
import { LivestockUnitCountEstimatedBreedingValueResultArgs } from "./args/LivestockUnitCountEstimatedBreedingValueResultArgs";
import { LivestockUnitCountPregnancyArgs } from "./args/LivestockUnitCountPregnancyArgs";
import { LivestockUnitCountSiredArgs } from "./args/LivestockUnitCountSiredArgs";
import { LivestockUnitCountTreatmentsArgs } from "./args/LivestockUnitCountTreatmentsArgs";
import { LivestockUnitCountWeightsArgs } from "./args/LivestockUnitCountWeightsArgs";

@TypeGraphQL.ObjectType("LivestockUnitCount", {})
export class LivestockUnitCount {
  sired!: number;
  birthed!: number;
  pregnancy!: number;
  weights!: number;
  treatments!: number;
  estimatedBreedingValueResult!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "sired",
    nullable: false,
  })
  getSired(
    @TypeGraphQL.Root() root: LivestockUnitCount,
    @TypeGraphQL.Args() args: LivestockUnitCountSiredArgs,
  ): number {
    return root.sired;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "birthed",
    nullable: false,
  })
  getBirthed(
    @TypeGraphQL.Root() root: LivestockUnitCount,
    @TypeGraphQL.Args() args: LivestockUnitCountBirthedArgs,
  ): number {
    return root.birthed;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "pregnancy",
    nullable: false,
  })
  getPregnancy(
    @TypeGraphQL.Root() root: LivestockUnitCount,
    @TypeGraphQL.Args() args: LivestockUnitCountPregnancyArgs,
  ): number {
    return root.pregnancy;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "weights",
    nullable: false,
  })
  getWeights(
    @TypeGraphQL.Root() root: LivestockUnitCount,
    @TypeGraphQL.Args() args: LivestockUnitCountWeightsArgs,
  ): number {
    return root.weights;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "treatments",
    nullable: false,
  })
  getTreatments(
    @TypeGraphQL.Root() root: LivestockUnitCount,
    @TypeGraphQL.Args() args: LivestockUnitCountTreatmentsArgs,
  ): number {
    return root.treatments;
  }

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    name: "estimatedBreedingValueResult",
    nullable: false,
  })
  getEstimatedBreedingValueResult(
    @TypeGraphQL.Root() root: LivestockUnitCount,
    @TypeGraphQL.Args()
    args: LivestockUnitCountEstimatedBreedingValueResultArgs,
  ): number {
    return root.estimatedBreedingValueResult;
  }
}

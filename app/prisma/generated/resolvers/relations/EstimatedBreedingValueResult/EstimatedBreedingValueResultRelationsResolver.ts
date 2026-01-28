import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import { LivestockUnit } from "../../../models/LivestockUnit";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class EstimatedBreedingValueResultRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => EstimatedBreedingValueDefinition, {
    nullable: false,
  })
  async ebv(
    @TypeGraphQL.Root()
    estimatedBreedingValueResult: EstimatedBreedingValueResult,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<EstimatedBreedingValueDefinition> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .estimatedBreedingValueResult.findUniqueOrThrow({
        where: {
          id: estimatedBreedingValueResult.id,
        },
      })
      .ebv({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }

  @TypeGraphQL.FieldResolver((_type) => LivestockUnit, {
    nullable: false,
  })
  async livestockUnit(
    @TypeGraphQL.Root()
    estimatedBreedingValueResult: EstimatedBreedingValueResult,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
  ): Promise<LivestockUnit> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .estimatedBreedingValueResult.findUniqueOrThrow({
        where: {
          id: estimatedBreedingValueResult.id,
        },
      })
      .livestockUnit({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}

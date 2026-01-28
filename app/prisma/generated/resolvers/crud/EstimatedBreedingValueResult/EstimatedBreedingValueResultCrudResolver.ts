import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateEstimatedBreedingValueResultArgs } from "./args/AggregateEstimatedBreedingValueResultArgs";
import { CreateManyEstimatedBreedingValueResultArgs } from "./args/CreateManyEstimatedBreedingValueResultArgs";
import { CreateOneEstimatedBreedingValueResultArgs } from "./args/CreateOneEstimatedBreedingValueResultArgs";
import { DeleteManyEstimatedBreedingValueResultArgs } from "./args/DeleteManyEstimatedBreedingValueResultArgs";
import { DeleteOneEstimatedBreedingValueResultArgs } from "./args/DeleteOneEstimatedBreedingValueResultArgs";
import { FindFirstEstimatedBreedingValueResultArgs } from "./args/FindFirstEstimatedBreedingValueResultArgs";
import { FindFirstEstimatedBreedingValueResultOrThrowArgs } from "./args/FindFirstEstimatedBreedingValueResultOrThrowArgs";
import { FindManyEstimatedBreedingValueResultArgs } from "./args/FindManyEstimatedBreedingValueResultArgs";
import { FindUniqueEstimatedBreedingValueResultArgs } from "./args/FindUniqueEstimatedBreedingValueResultArgs";
import { FindUniqueEstimatedBreedingValueResultOrThrowArgs } from "./args/FindUniqueEstimatedBreedingValueResultOrThrowArgs";
import { GroupByEstimatedBreedingValueResultArgs } from "./args/GroupByEstimatedBreedingValueResultArgs";
import { UpdateManyEstimatedBreedingValueResultArgs } from "./args/UpdateManyEstimatedBreedingValueResultArgs";
import { UpdateOneEstimatedBreedingValueResultArgs } from "./args/UpdateOneEstimatedBreedingValueResultArgs";
import { UpsertOneEstimatedBreedingValueResultArgs } from "./args/UpsertOneEstimatedBreedingValueResultArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";
import { EstimatedBreedingValueResult } from "../../../models/EstimatedBreedingValueResult";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateEstimatedBreedingValueResult } from "../../outputs/AggregateEstimatedBreedingValueResult";
import { EstimatedBreedingValueResultGroupBy } from "../../outputs/EstimatedBreedingValueResultGroupBy";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueResult)
export class EstimatedBreedingValueResultCrudResolver {
  @TypeGraphQL.Query((_returns) => AggregateEstimatedBreedingValueResult, {
    nullable: false,
  })
  async aggregateEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateEstimatedBreedingValueResultArgs,
  ): Promise<AggregateEstimatedBreedingValueResult> {
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async createManyEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateManyEstimatedBreedingValueResultArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueResult, {
    nullable: false,
  })
  async createOneEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyEstimatedBreedingValueResultArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async deleteOneEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async findFirstEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async findFirstEstimatedBreedingValueResultOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstEstimatedBreedingValueResultOrThrowArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueResult.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [EstimatedBreedingValueResult], {
    nullable: false,
  })
  async estimatedBreedingValueResults(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async estimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async getEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueEstimatedBreedingValueResultOrThrowArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueResult.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [EstimatedBreedingValueResultGroupBy], {
    nullable: false,
  })
  async groupByEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResultGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(
          ([_, v]) => v != null,
        ),
      ),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async updateManyEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyEstimatedBreedingValueResultArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueResult, {
    nullable: true,
  })
  async updateOneEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueResult, {
    nullable: false,
  })
  async upsertOneEstimatedBreedingValueResult(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneEstimatedBreedingValueResultArgs,
  ): Promise<EstimatedBreedingValueResult> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueResult.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

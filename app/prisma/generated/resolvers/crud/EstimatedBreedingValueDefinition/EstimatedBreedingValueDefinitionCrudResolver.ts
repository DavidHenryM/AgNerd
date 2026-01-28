import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateEstimatedBreedingValueDefinitionArgs } from "./args/AggregateEstimatedBreedingValueDefinitionArgs";
import { CreateManyEstimatedBreedingValueDefinitionArgs } from "./args/CreateManyEstimatedBreedingValueDefinitionArgs";
import { CreateOneEstimatedBreedingValueDefinitionArgs } from "./args/CreateOneEstimatedBreedingValueDefinitionArgs";
import { DeleteManyEstimatedBreedingValueDefinitionArgs } from "./args/DeleteManyEstimatedBreedingValueDefinitionArgs";
import { DeleteOneEstimatedBreedingValueDefinitionArgs } from "./args/DeleteOneEstimatedBreedingValueDefinitionArgs";
import { FindFirstEstimatedBreedingValueDefinitionArgs } from "./args/FindFirstEstimatedBreedingValueDefinitionArgs";
import { FindFirstEstimatedBreedingValueDefinitionOrThrowArgs } from "./args/FindFirstEstimatedBreedingValueDefinitionOrThrowArgs";
import { FindManyEstimatedBreedingValueDefinitionArgs } from "./args/FindManyEstimatedBreedingValueDefinitionArgs";
import { FindUniqueEstimatedBreedingValueDefinitionArgs } from "./args/FindUniqueEstimatedBreedingValueDefinitionArgs";
import { FindUniqueEstimatedBreedingValueDefinitionOrThrowArgs } from "./args/FindUniqueEstimatedBreedingValueDefinitionOrThrowArgs";
import { GroupByEstimatedBreedingValueDefinitionArgs } from "./args/GroupByEstimatedBreedingValueDefinitionArgs";
import { UpdateManyEstimatedBreedingValueDefinitionArgs } from "./args/UpdateManyEstimatedBreedingValueDefinitionArgs";
import { UpdateOneEstimatedBreedingValueDefinitionArgs } from "./args/UpdateOneEstimatedBreedingValueDefinitionArgs";
import { UpsertOneEstimatedBreedingValueDefinitionArgs } from "./args/UpsertOneEstimatedBreedingValueDefinitionArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";
import { EstimatedBreedingValueDefinition } from "../../../models/EstimatedBreedingValueDefinition";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateEstimatedBreedingValueDefinition } from "../../outputs/AggregateEstimatedBreedingValueDefinition";
import { EstimatedBreedingValueDefinitionGroupBy } from "../../outputs/EstimatedBreedingValueDefinitionGroupBy";

@TypeGraphQL.Resolver((_of) => EstimatedBreedingValueDefinition)
export class EstimatedBreedingValueDefinitionCrudResolver {
  @TypeGraphQL.Query((_returns) => AggregateEstimatedBreedingValueDefinition, {
    nullable: false,
  })
  async aggregateEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateEstimatedBreedingValueDefinitionArgs,
  ): Promise<AggregateEstimatedBreedingValueDefinition> {
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.aggregate(
      {
        ...args,
        ...transformInfoIntoPrismaArgs(info),
      },
    );
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async createManyEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateManyEstimatedBreedingValueDefinitionArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueDefinition.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueDefinition, {
    nullable: false,
  })
  async createOneEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyEstimatedBreedingValueDefinitionArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueDefinition.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async deleteOneEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async findFirstEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.findFirst(
      {
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      },
    );
  }

  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async findFirstEstimatedBreedingValueDefinitionOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args()
    args: FindFirstEstimatedBreedingValueDefinitionOrThrowArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueDefinition.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [EstimatedBreedingValueDefinition], {
    nullable: false,
  })
  async estimatedBreedingValueDefinitions(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async estimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueDefinition.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async getEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args()
    args: FindUniqueEstimatedBreedingValueDefinitionOrThrowArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueDefinition.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [EstimatedBreedingValueDefinitionGroupBy], {
    nullable: false,
  })
  async groupByEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinitionGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.groupBy({
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
  async updateManyEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyEstimatedBreedingValueDefinitionArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(
      ctx,
    ).estimatedBreedingValueDefinition.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueDefinition, {
    nullable: true,
  })
  async updateOneEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => EstimatedBreedingValueDefinition, {
    nullable: false,
  })
  async upsertOneEstimatedBreedingValueDefinition(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneEstimatedBreedingValueDefinitionArgs,
  ): Promise<EstimatedBreedingValueDefinition> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).estimatedBreedingValueDefinition.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

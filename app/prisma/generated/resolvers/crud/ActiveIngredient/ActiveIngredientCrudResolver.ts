import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateActiveIngredientArgs } from "./args/AggregateActiveIngredientArgs";
import { CreateManyActiveIngredientArgs } from "./args/CreateManyActiveIngredientArgs";
import { CreateOneActiveIngredientArgs } from "./args/CreateOneActiveIngredientArgs";
import { DeleteManyActiveIngredientArgs } from "./args/DeleteManyActiveIngredientArgs";
import { DeleteOneActiveIngredientArgs } from "./args/DeleteOneActiveIngredientArgs";
import { FindFirstActiveIngredientArgs } from "./args/FindFirstActiveIngredientArgs";
import { FindFirstActiveIngredientOrThrowArgs } from "./args/FindFirstActiveIngredientOrThrowArgs";
import { FindManyActiveIngredientArgs } from "./args/FindManyActiveIngredientArgs";
import { FindUniqueActiveIngredientArgs } from "./args/FindUniqueActiveIngredientArgs";
import { FindUniqueActiveIngredientOrThrowArgs } from "./args/FindUniqueActiveIngredientOrThrowArgs";
import { GroupByActiveIngredientArgs } from "./args/GroupByActiveIngredientArgs";
import { UpdateManyActiveIngredientArgs } from "./args/UpdateManyActiveIngredientArgs";
import { UpdateOneActiveIngredientArgs } from "./args/UpdateOneActiveIngredientArgs";
import { UpsertOneActiveIngredientArgs } from "./args/UpsertOneActiveIngredientArgs";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";
import { ActiveIngredient } from "../../../models/ActiveIngredient";
import { ActiveIngredientGroupBy } from "../../outputs/ActiveIngredientGroupBy";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateActiveIngredient } from "../../outputs/AggregateActiveIngredient";

@TypeGraphQL.Resolver((_of) => ActiveIngredient)
export class ActiveIngredientCrudResolver {
  @TypeGraphQL.Query((_returns) => AggregateActiveIngredient, {
    nullable: false,
  })
  async aggregateActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: AggregateActiveIngredientArgs,
  ): Promise<AggregateActiveIngredient> {
    return getPrismaFromContext(ctx).activeIngredient.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async createManyActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateManyActiveIngredientArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => ActiveIngredient, {
    nullable: false,
  })
  async createOneActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneActiveIngredientArgs,
  ): Promise<ActiveIngredient> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteManyActiveIngredientArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async deleteOneActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: DeleteOneActiveIngredientArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async findFirstActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstActiveIngredientArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async findFirstActiveIngredientOrThrow(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindFirstActiveIngredientOrThrowArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [ActiveIngredient], {
    nullable: false,
  })
  async activeIngredients(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyActiveIngredientArgs,
  ): Promise<ActiveIngredient[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async activeIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueActiveIngredientArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async getActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueActiveIngredientOrThrowArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [ActiveIngredientGroupBy], {
    nullable: false,
  })
  async groupByActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: GroupByActiveIngredientArgs,
  ): Promise<ActiveIngredientGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } =
      transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.groupBy({
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
  async updateManyActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateManyActiveIngredientArgs,
  ): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => ActiveIngredient, {
    nullable: true,
  })
  async updateOneActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateOneActiveIngredientArgs,
  ): Promise<ActiveIngredient | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => ActiveIngredient, {
    nullable: false,
  })
  async upsertOneActiveIngredient(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneActiveIngredientArgs,
  ): Promise<ActiveIngredient> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).activeIngredient.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregatePregnancyTestArgs } from "./args/AggregatePregnancyTestArgs";
import { CreateManyPregnancyTestArgs } from "./args/CreateManyPregnancyTestArgs";
import { CreateOnePregnancyTestArgs } from "./args/CreateOnePregnancyTestArgs";
import { DeleteManyPregnancyTestArgs } from "./args/DeleteManyPregnancyTestArgs";
import { DeleteOnePregnancyTestArgs } from "./args/DeleteOnePregnancyTestArgs";
import { FindFirstPregnancyTestArgs } from "./args/FindFirstPregnancyTestArgs";
import { FindManyPregnancyTestArgs } from "./args/FindManyPregnancyTestArgs";
import { FindUniquePregnancyTestArgs } from "./args/FindUniquePregnancyTestArgs";
import { GroupByPregnancyTestArgs } from "./args/GroupByPregnancyTestArgs";
import { UpdateManyPregnancyTestArgs } from "./args/UpdateManyPregnancyTestArgs";
import { UpdateOnePregnancyTestArgs } from "./args/UpdateOnePregnancyTestArgs";
import { UpsertOnePregnancyTestArgs } from "./args/UpsertOnePregnancyTestArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { PregnancyTest } from "../../../models/PregnancyTest";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregatePregnancyTest } from "../../outputs/AggregatePregnancyTest";
import { PregnancyTestGroupBy } from "../../outputs/PregnancyTestGroupBy";

@TypeGraphQL.Resolver(_of => PregnancyTest)
export class PregnancyTestCrudResolver {
  @TypeGraphQL.Query(_returns => AggregatePregnancyTest, {
    nullable: false
  })
  async aggregatePregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregatePregnancyTestArgs): Promise<AggregatePregnancyTest> {
    return getPrismaFromContext(ctx).pregnancyTest.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async createManyPregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyPregnancyTestArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => PregnancyTest, {
    nullable: false
  })
  async createOnePregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOnePregnancyTestArgs): Promise<PregnancyTest> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyPregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyPregnancyTestArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => PregnancyTest, {
    nullable: true
  })
  async deleteOnePregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOnePregnancyTestArgs): Promise<PregnancyTest | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => PregnancyTest, {
    nullable: true
  })
  async findFirstPregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstPregnancyTestArgs): Promise<PregnancyTest | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [PregnancyTest], {
    nullable: false
  })
  async pregnancyTests(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyPregnancyTestArgs): Promise<PregnancyTest[]> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => PregnancyTest, {
    nullable: true
  })
  async pregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniquePregnancyTestArgs): Promise<PregnancyTest | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [PregnancyTestGroupBy], {
    nullable: false
  })
  async groupByPregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByPregnancyTestArgs): Promise<PregnancyTestGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyPregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyPregnancyTestArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => PregnancyTest, {
    nullable: true
  })
  async updateOnePregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOnePregnancyTestArgs): Promise<PregnancyTest | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => PregnancyTest, {
    nullable: false
  })
  async upsertOnePregnancyTest(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOnePregnancyTestArgs): Promise<PregnancyTest> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).pregnancyTest.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

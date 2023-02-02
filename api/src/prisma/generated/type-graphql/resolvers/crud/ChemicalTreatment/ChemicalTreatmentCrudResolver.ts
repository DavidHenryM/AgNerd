import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateChemicalTreatmentArgs } from "./args/AggregateChemicalTreatmentArgs";
import { CreateManyChemicalTreatmentArgs } from "./args/CreateManyChemicalTreatmentArgs";
import { CreateOneChemicalTreatmentArgs } from "./args/CreateOneChemicalTreatmentArgs";
import { DeleteManyChemicalTreatmentArgs } from "./args/DeleteManyChemicalTreatmentArgs";
import { DeleteOneChemicalTreatmentArgs } from "./args/DeleteOneChemicalTreatmentArgs";
import { FindFirstChemicalTreatmentArgs } from "./args/FindFirstChemicalTreatmentArgs";
import { FindManyChemicalTreatmentArgs } from "./args/FindManyChemicalTreatmentArgs";
import { FindUniqueChemicalTreatmentArgs } from "./args/FindUniqueChemicalTreatmentArgs";
import { GroupByChemicalTreatmentArgs } from "./args/GroupByChemicalTreatmentArgs";
import { UpdateManyChemicalTreatmentArgs } from "./args/UpdateManyChemicalTreatmentArgs";
import { UpdateOneChemicalTreatmentArgs } from "./args/UpdateOneChemicalTreatmentArgs";
import { UpsertOneChemicalTreatmentArgs } from "./args/UpsertOneChemicalTreatmentArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { ChemicalTreatment } from "../../../models/ChemicalTreatment";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateChemicalTreatment } from "../../outputs/AggregateChemicalTreatment";
import { ChemicalTreatmentGroupBy } from "../../outputs/ChemicalTreatmentGroupBy";

@TypeGraphQL.Resolver(_of => ChemicalTreatment)
export class ChemicalTreatmentCrudResolver {
  @TypeGraphQL.Query(_returns => AggregateChemicalTreatment, {
    nullable: false
  })
  async aggregateChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateChemicalTreatmentArgs): Promise<AggregateChemicalTreatment> {
    return getPrismaFromContext(ctx).chemicalTreatment.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async createManyChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyChemicalTreatmentArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => ChemicalTreatment, {
    nullable: false
  })
  async createOneChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOneChemicalTreatmentArgs): Promise<ChemicalTreatment> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyChemicalTreatmentArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => ChemicalTreatment, {
    nullable: true
  })
  async deleteOneChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOneChemicalTreatmentArgs): Promise<ChemicalTreatment | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => ChemicalTreatment, {
    nullable: true
  })
  async findFirstChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstChemicalTreatmentArgs): Promise<ChemicalTreatment | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [ChemicalTreatment], {
    nullable: false
  })
  async chemicalTreatments(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyChemicalTreatmentArgs): Promise<ChemicalTreatment[]> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => ChemicalTreatment, {
    nullable: true
  })
  async chemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueChemicalTreatmentArgs): Promise<ChemicalTreatment | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [ChemicalTreatmentGroupBy], {
    nullable: false
  })
  async groupByChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByChemicalTreatmentArgs): Promise<ChemicalTreatmentGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyChemicalTreatmentArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => ChemicalTreatment, {
    nullable: true
  })
  async updateOneChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneChemicalTreatmentArgs): Promise<ChemicalTreatment | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => ChemicalTreatment, {
    nullable: false
  })
  async upsertOneChemicalTreatment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOneChemicalTreatmentArgs): Promise<ChemicalTreatment> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).chemicalTreatment.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

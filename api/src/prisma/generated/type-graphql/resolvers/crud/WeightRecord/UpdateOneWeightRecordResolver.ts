import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpdateOneWeightRecordArgs } from "./args/UpdateOneWeightRecordArgs";
import { WeightRecord } from "../../../models/WeightRecord";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => WeightRecord)
export class UpdateOneWeightRecordResolver {
  @TypeGraphQL.Mutation(_returns => WeightRecord, {
    nullable: true
  })
  async updateOneWeightRecord(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneWeightRecordArgs): Promise<WeightRecord | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).weightRecord.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateLivestockUnitArgs } from "./args/AggregateLivestockUnitArgs";
import { LivestockUnit } from "../../../models/LivestockUnit";
import { AggregateLivestockUnit } from "../../outputs/AggregateLivestockUnit";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LivestockUnit)
export class AggregateLivestockUnitResolver {
  @TypeGraphQL.Query(_returns => AggregateLivestockUnit, {
    nullable: false
  })
  async aggregateLivestockUnit(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateLivestockUnitArgs): Promise<AggregateLivestockUnit> {
    return getPrismaFromContext(ctx).livestockUnit.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}

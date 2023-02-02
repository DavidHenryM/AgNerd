import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { GroupByLoraDeviceArgs } from "./args/GroupByLoraDeviceArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import { LoraDeviceGroupBy } from "../../outputs/LoraDeviceGroupBy";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LoraDevice)
export class GroupByLoraDeviceResolver {
  @TypeGraphQL.Query(_returns => [LoraDeviceGroupBy], {
    nullable: false
  })
  async groupByLoraDevice(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByLoraDeviceArgs): Promise<LoraDeviceGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).loraDevice.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}

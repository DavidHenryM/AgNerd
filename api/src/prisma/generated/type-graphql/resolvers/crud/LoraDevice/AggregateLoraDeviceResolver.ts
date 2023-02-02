import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateLoraDeviceArgs } from "./args/AggregateLoraDeviceArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import { AggregateLoraDevice } from "../../outputs/AggregateLoraDevice";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LoraDevice)
export class AggregateLoraDeviceResolver {
  @TypeGraphQL.Query(_returns => AggregateLoraDevice, {
    nullable: false
  })
  async aggregateLoraDevice(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateLoraDeviceArgs): Promise<AggregateLoraDevice> {
    return getPrismaFromContext(ctx).loraDevice.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}

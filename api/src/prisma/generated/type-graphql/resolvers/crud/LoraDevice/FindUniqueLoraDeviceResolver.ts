import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueLoraDeviceArgs } from "./args/FindUniqueLoraDeviceArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LoraDevice)
export class FindUniqueLoraDeviceResolver {
  @TypeGraphQL.Query(_returns => LoraDevice, {
    nullable: true
  })
  async loraDevice(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueLoraDeviceArgs): Promise<LoraDevice | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).loraDevice.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

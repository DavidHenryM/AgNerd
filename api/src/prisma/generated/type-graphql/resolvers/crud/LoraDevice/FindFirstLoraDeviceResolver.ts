import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstLoraDeviceArgs } from "./args/FindFirstLoraDeviceArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LoraDevice)
export class FindFirstLoraDeviceResolver {
  @TypeGraphQL.Query(_returns => LoraDevice, {
    nullable: true
  })
  async findFirstLoraDevice(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstLoraDeviceArgs): Promise<LoraDevice | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).loraDevice.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

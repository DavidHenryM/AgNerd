import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { DeleteOneLoraDeviceArgs } from "./args/DeleteOneLoraDeviceArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LoraDevice)
export class DeleteOneLoraDeviceResolver {
  @TypeGraphQL.Mutation(_returns => LoraDevice, {
    nullable: true
  })
  async deleteOneLoraDevice(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOneLoraDeviceArgs): Promise<LoraDevice | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).loraDevice.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

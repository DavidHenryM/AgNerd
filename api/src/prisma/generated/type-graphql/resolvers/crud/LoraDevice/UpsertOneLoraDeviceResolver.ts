import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpsertOneLoraDeviceArgs } from "./args/UpsertOneLoraDeviceArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => LoraDevice)
export class UpsertOneLoraDeviceResolver {
  @TypeGraphQL.Mutation(_returns => LoraDevice, {
    nullable: false
  })
  async upsertOneLoraDevice(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOneLoraDeviceArgs): Promise<LoraDevice> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).loraDevice.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

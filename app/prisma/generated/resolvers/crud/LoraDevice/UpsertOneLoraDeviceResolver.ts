import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneLoraDeviceArgs } from "./args/UpsertOneLoraDeviceArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LoraDevice)
export class UpsertOneLoraDeviceResolver {
  @TypeGraphQL.Mutation((_returns) => LoraDevice, {
    nullable: false,
  })
  async upsertOneLoraDevice(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneLoraDeviceArgs,
  ): Promise<LoraDevice> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).loraDevice.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

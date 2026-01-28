import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueLoraDeviceOrThrowArgs } from "./args/FindUniqueLoraDeviceOrThrowArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LoraDevice)
export class FindUniqueLoraDeviceOrThrowResolver {
  @TypeGraphQL.Query((_returns) => LoraDevice, {
    nullable: true,
  })
  async getLoraDevice(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueLoraDeviceOrThrowArgs,
  ): Promise<LoraDevice | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).loraDevice.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

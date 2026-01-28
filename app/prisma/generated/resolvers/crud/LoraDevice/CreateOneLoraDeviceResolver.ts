import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateOneLoraDeviceArgs } from "./args/CreateOneLoraDeviceArgs";
import { LoraDevice } from "../../../models/LoraDevice";
import {
  transformInfoIntoPrismaArgs,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "../../../helpers";

@TypeGraphQL.Resolver((_of) => LoraDevice)
export class CreateOneLoraDeviceResolver {
  @TypeGraphQL.Mutation((_returns) => LoraDevice, {
    nullable: false,
  })
  async createOneLoraDevice(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneLoraDeviceArgs,
  ): Promise<LoraDevice> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).loraDevice.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}

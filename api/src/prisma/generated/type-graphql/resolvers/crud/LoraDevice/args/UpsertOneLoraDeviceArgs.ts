import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceCreateInput } from "../../../inputs/LoraDeviceCreateInput";
import { LoraDeviceUpdateInput } from "../../../inputs/LoraDeviceUpdateInput";
import { LoraDeviceWhereUniqueInput } from "../../../inputs/LoraDeviceWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneLoraDeviceArgs {
  @TypeGraphQL.Field(_type => LoraDeviceWhereUniqueInput, {
    nullable: false
  })
  where!: LoraDeviceWhereUniqueInput;

  @TypeGraphQL.Field(_type => LoraDeviceCreateInput, {
    nullable: false
  })
  create!: LoraDeviceCreateInput;

  @TypeGraphQL.Field(_type => LoraDeviceUpdateInput, {
    nullable: false
  })
  update!: LoraDeviceUpdateInput;
}

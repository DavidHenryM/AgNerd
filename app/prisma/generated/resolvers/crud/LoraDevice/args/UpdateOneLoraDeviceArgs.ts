import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceUpdateInput } from "../../../inputs/LoraDeviceUpdateInput";
import { LoraDeviceWhereUniqueInput } from "../../../inputs/LoraDeviceWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneLoraDeviceArgs {
  @TypeGraphQL.Field((_type) => LoraDeviceUpdateInput, {
    nullable: false,
  })
  data!: LoraDeviceUpdateInput;

  @TypeGraphQL.Field((_type) => LoraDeviceWhereUniqueInput, {
    nullable: false,
  })
  where!: LoraDeviceWhereUniqueInput;
}

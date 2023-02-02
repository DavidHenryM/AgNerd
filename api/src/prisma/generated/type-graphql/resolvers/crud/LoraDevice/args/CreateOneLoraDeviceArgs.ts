import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceCreateInput } from "../../../inputs/LoraDeviceCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneLoraDeviceArgs {
  @TypeGraphQL.Field(_type => LoraDeviceCreateInput, {
    nullable: false
  })
  data!: LoraDeviceCreateInput;
}

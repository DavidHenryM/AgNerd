import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceCreateManyInput } from "../../../inputs/LoraDeviceCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyLoraDeviceArgs {
  @TypeGraphQL.Field((_type) => [LoraDeviceCreateManyInput], {
    nullable: false,
  })
  data!: LoraDeviceCreateManyInput[];
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceWhereInput } from "../../../inputs/LoraDeviceWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyLoraDeviceArgs {
  @TypeGraphQL.Field((_type) => LoraDeviceWhereInput, {
    nullable: true,
  })
  where?: LoraDeviceWhereInput | undefined;
}

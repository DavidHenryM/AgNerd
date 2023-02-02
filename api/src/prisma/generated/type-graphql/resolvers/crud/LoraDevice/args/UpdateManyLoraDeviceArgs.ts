import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceUpdateManyMutationInput } from "../../../inputs/LoraDeviceUpdateManyMutationInput";
import { LoraDeviceWhereInput } from "../../../inputs/LoraDeviceWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyLoraDeviceArgs {
  @TypeGraphQL.Field(_type => LoraDeviceUpdateManyMutationInput, {
    nullable: false
  })
  data!: LoraDeviceUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => LoraDeviceWhereInput, {
    nullable: true
  })
  where?: LoraDeviceWhereInput | undefined;
}

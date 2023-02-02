import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceWhereUniqueInput } from "../../../inputs/LoraDeviceWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueLoraDeviceArgs {
  @TypeGraphQL.Field(_type => LoraDeviceWhereUniqueInput, {
    nullable: false
  })
  where!: LoraDeviceWhereUniqueInput;
}

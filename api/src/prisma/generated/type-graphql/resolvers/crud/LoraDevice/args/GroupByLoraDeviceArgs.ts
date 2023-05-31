import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceOrderByWithAggregationInput } from "../../../inputs/LoraDeviceOrderByWithAggregationInput";
import { LoraDeviceScalarWhereWithAggregatesInput } from "../../../inputs/LoraDeviceScalarWhereWithAggregatesInput";
import { LoraDeviceWhereInput } from "../../../inputs/LoraDeviceWhereInput";
import { LoraDeviceScalarFieldEnum } from "../../../../enums/LoraDeviceScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByLoraDeviceArgs {
  @TypeGraphQL.Field((_type) => LoraDeviceWhereInput, {
    nullable: true,
  })
  where?: LoraDeviceWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [LoraDeviceOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: LoraDeviceOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LoraDeviceScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    | "id"
    | "name"
    | "deviceId"
    | "deviceEui"
    | "appEui"
    | "appKey"
    | "manufacturer"
    | "partNumber"
    | "activationMethod"
  >;

  @TypeGraphQL.Field((_type) => LoraDeviceScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: LoraDeviceScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

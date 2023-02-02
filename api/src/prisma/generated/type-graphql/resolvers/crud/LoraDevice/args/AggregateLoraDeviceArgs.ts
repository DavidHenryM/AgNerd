import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LoraDeviceOrderByWithRelationInput } from "../../../inputs/LoraDeviceOrderByWithRelationInput";
import { LoraDeviceWhereInput } from "../../../inputs/LoraDeviceWhereInput";
import { LoraDeviceWhereUniqueInput } from "../../../inputs/LoraDeviceWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateLoraDeviceArgs {
  @TypeGraphQL.Field(_type => LoraDeviceWhereInput, {
    nullable: true
  })
  where?: LoraDeviceWhereInput | undefined;

  @TypeGraphQL.Field(_type => [LoraDeviceOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: LoraDeviceOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => LoraDeviceWhereUniqueInput, {
    nullable: true
  })
  cursor?: LoraDeviceWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

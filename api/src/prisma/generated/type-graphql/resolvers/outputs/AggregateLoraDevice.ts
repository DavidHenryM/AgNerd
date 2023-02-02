import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LoraDeviceCountAggregate } from "../outputs/LoraDeviceCountAggregate";
import { LoraDeviceMaxAggregate } from "../outputs/LoraDeviceMaxAggregate";
import { LoraDeviceMinAggregate } from "../outputs/LoraDeviceMinAggregate";

@TypeGraphQL.ObjectType("AggregateLoraDevice", {
  isAbstract: true
})
export class AggregateLoraDevice {
  @TypeGraphQL.Field(_type => LoraDeviceCountAggregate, {
    nullable: true
  })
  _count!: LoraDeviceCountAggregate | null;

  @TypeGraphQL.Field(_type => LoraDeviceMinAggregate, {
    nullable: true
  })
  _min!: LoraDeviceMinAggregate | null;

  @TypeGraphQL.Field(_type => LoraDeviceMaxAggregate, {
    nullable: true
  })
  _max!: LoraDeviceMaxAggregate | null;
}

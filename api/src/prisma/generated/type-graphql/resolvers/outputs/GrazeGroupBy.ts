import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCountAggregate } from "../outputs/GrazeCountAggregate";
import { GrazeMaxAggregate } from "../outputs/GrazeMaxAggregate";
import { GrazeMinAggregate } from "../outputs/GrazeMinAggregate";

@TypeGraphQL.ObjectType("GrazeGroupBy", {
  isAbstract: true
})
export class GrazeGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  startDatetime!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  endDateTime!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  paddockId!: string;

  @TypeGraphQL.Field(_type => [String], {
    nullable: true
  })
  mobIds!: string[] | null;

  @TypeGraphQL.Field(_type => GrazeCountAggregate, {
    nullable: true
  })
  _count!: GrazeCountAggregate | null;

  @TypeGraphQL.Field(_type => GrazeMinAggregate, {
    nullable: true
  })
  _min!: GrazeMinAggregate | null;

  @TypeGraphQL.Field(_type => GrazeMaxAggregate, {
    nullable: true
  })
  _max!: GrazeMaxAggregate | null;
}

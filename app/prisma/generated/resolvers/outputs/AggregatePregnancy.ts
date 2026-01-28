import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCountAggregate } from "../outputs/PregnancyCountAggregate";
import { PregnancyMaxAggregate } from "../outputs/PregnancyMaxAggregate";
import { PregnancyMinAggregate } from "../outputs/PregnancyMinAggregate";

@TypeGraphQL.ObjectType("AggregatePregnancy", {})
export class AggregatePregnancy {
  @TypeGraphQL.Field((_type) => PregnancyCountAggregate, {
    nullable: true,
  })
  _count!: PregnancyCountAggregate | null;

  @TypeGraphQL.Field((_type) => PregnancyMinAggregate, {
    nullable: true,
  })
  _min!: PregnancyMinAggregate | null;

  @TypeGraphQL.Field((_type) => PregnancyMaxAggregate, {
    nullable: true,
  })
  _max!: PregnancyMaxAggregate | null;
}

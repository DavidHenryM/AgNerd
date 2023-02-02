import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdAvgAggregate } from "../outputs/VisualIdAvgAggregate";
import { VisualIdCountAggregate } from "../outputs/VisualIdCountAggregate";
import { VisualIdMaxAggregate } from "../outputs/VisualIdMaxAggregate";
import { VisualIdMinAggregate } from "../outputs/VisualIdMinAggregate";
import { VisualIdSumAggregate } from "../outputs/VisualIdSumAggregate";

@TypeGraphQL.ObjectType("AggregateVisualId", {
  isAbstract: true
})
export class AggregateVisualId {
  @TypeGraphQL.Field(_type => VisualIdCountAggregate, {
    nullable: true
  })
  _count!: VisualIdCountAggregate | null;

  @TypeGraphQL.Field(_type => VisualIdAvgAggregate, {
    nullable: true
  })
  _avg!: VisualIdAvgAggregate | null;

  @TypeGraphQL.Field(_type => VisualIdSumAggregate, {
    nullable: true
  })
  _sum!: VisualIdSumAggregate | null;

  @TypeGraphQL.Field(_type => VisualIdMinAggregate, {
    nullable: true
  })
  _min!: VisualIdMinAggregate | null;

  @TypeGraphQL.Field(_type => VisualIdMaxAggregate, {
    nullable: true
  })
  _max!: VisualIdMaxAggregate | null;
}

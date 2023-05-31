import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VisualIdCountAggregate } from "../outputs/VisualIdCountAggregate";
import { VisualIdMaxAggregate } from "../outputs/VisualIdMaxAggregate";
import { VisualIdMinAggregate } from "../outputs/VisualIdMinAggregate";

@TypeGraphQL.ObjectType("AggregateVisualId", {
  isAbstract: true,
})
export class AggregateVisualId {
  @TypeGraphQL.Field((_type) => VisualIdCountAggregate, {
    nullable: true,
  })
  _count!: VisualIdCountAggregate | null;

  @TypeGraphQL.Field((_type) => VisualIdMinAggregate, {
    nullable: true,
  })
  _min!: VisualIdMinAggregate | null;

  @TypeGraphQL.Field((_type) => VisualIdMaxAggregate, {
    nullable: true,
  })
  _max!: VisualIdMaxAggregate | null;
}

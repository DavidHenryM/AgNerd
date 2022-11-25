import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCountAggregate } from "../outputs/PaddockCountAggregate";
import { PaddockMaxAggregate } from "../outputs/PaddockMaxAggregate";
import { PaddockMinAggregate } from "../outputs/PaddockMinAggregate";

@TypeGraphQL.ObjectType("AggregatePaddock", {
  isAbstract: true
})
export class AggregatePaddock {
  @TypeGraphQL.Field(_type => PaddockCountAggregate, {
    nullable: true
  })
  _count!: PaddockCountAggregate | null;

  @TypeGraphQL.Field(_type => PaddockMinAggregate, {
    nullable: true
  })
  _min!: PaddockMinAggregate | null;

  @TypeGraphQL.Field(_type => PaddockMaxAggregate, {
    nullable: true
  })
  _max!: PaddockMaxAggregate | null;
}

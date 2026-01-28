import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCountAggregate } from "../outputs/FarmCountAggregate";
import { FarmMaxAggregate } from "../outputs/FarmMaxAggregate";
import { FarmMinAggregate } from "../outputs/FarmMinAggregate";

@TypeGraphQL.ObjectType("AggregateFarm", {})
export class AggregateFarm {
  @TypeGraphQL.Field((_type) => FarmCountAggregate, {
    nullable: true,
  })
  _count!: FarmCountAggregate | null;

  @TypeGraphQL.Field((_type) => FarmMinAggregate, {
    nullable: true,
  })
  _min!: FarmMinAggregate | null;

  @TypeGraphQL.Field((_type) => FarmMaxAggregate, {
    nullable: true,
  })
  _max!: FarmMaxAggregate | null;
}

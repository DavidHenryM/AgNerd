import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCountAggregate } from "../outputs/MobCountAggregate";
import { MobMaxAggregate } from "../outputs/MobMaxAggregate";
import { MobMinAggregate } from "../outputs/MobMinAggregate";

@TypeGraphQL.ObjectType("AggregateMob", {
  isAbstract: true
})
export class AggregateMob {
  @TypeGraphQL.Field(_type => MobCountAggregate, {
    nullable: true
  })
  _count!: MobCountAggregate | null;

  @TypeGraphQL.Field(_type => MobMinAggregate, {
    nullable: true
  })
  _min!: MobMinAggregate | null;

  @TypeGraphQL.Field(_type => MobMaxAggregate, {
    nullable: true
  })
  _max!: MobMaxAggregate | null;
}

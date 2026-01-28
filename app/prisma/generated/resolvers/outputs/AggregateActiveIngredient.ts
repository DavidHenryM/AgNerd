import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientAvgAggregate } from "../outputs/ActiveIngredientAvgAggregate";
import { ActiveIngredientCountAggregate } from "../outputs/ActiveIngredientCountAggregate";
import { ActiveIngredientMaxAggregate } from "../outputs/ActiveIngredientMaxAggregate";
import { ActiveIngredientMinAggregate } from "../outputs/ActiveIngredientMinAggregate";
import { ActiveIngredientSumAggregate } from "../outputs/ActiveIngredientSumAggregate";

@TypeGraphQL.ObjectType("AggregateActiveIngredient", {})
export class AggregateActiveIngredient {
  @TypeGraphQL.Field((_type) => ActiveIngredientCountAggregate, {
    nullable: true,
  })
  _count!: ActiveIngredientCountAggregate | null;

  @TypeGraphQL.Field((_type) => ActiveIngredientAvgAggregate, {
    nullable: true,
  })
  _avg!: ActiveIngredientAvgAggregate | null;

  @TypeGraphQL.Field((_type) => ActiveIngredientSumAggregate, {
    nullable: true,
  })
  _sum!: ActiveIngredientSumAggregate | null;

  @TypeGraphQL.Field((_type) => ActiveIngredientMinAggregate, {
    nullable: true,
  })
  _min!: ActiveIngredientMinAggregate | null;

  @TypeGraphQL.Field((_type) => ActiveIngredientMaxAggregate, {
    nullable: true,
  })
  _max!: ActiveIngredientMaxAggregate | null;
}

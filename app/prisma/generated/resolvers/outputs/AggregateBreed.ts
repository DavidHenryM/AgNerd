import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCountAggregate } from "../outputs/BreedCountAggregate";
import { BreedMaxAggregate } from "../outputs/BreedMaxAggregate";
import { BreedMinAggregate } from "../outputs/BreedMinAggregate";

@TypeGraphQL.ObjectType("AggregateBreed", {})
export class AggregateBreed {
  @TypeGraphQL.Field((_type) => BreedCountAggregate, {
    nullable: true,
  })
  _count!: BreedCountAggregate | null;

  @TypeGraphQL.Field((_type) => BreedMinAggregate, {
    nullable: true,
  })
  _min!: BreedMinAggregate | null;

  @TypeGraphQL.Field((_type) => BreedMaxAggregate, {
    nullable: true,
  })
  _max!: BreedMaxAggregate | null;
}

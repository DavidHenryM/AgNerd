import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionCountAggregate } from "../outputs/EstimatedBreedingValueDefinitionCountAggregate";
import { EstimatedBreedingValueDefinitionMaxAggregate } from "../outputs/EstimatedBreedingValueDefinitionMaxAggregate";
import { EstimatedBreedingValueDefinitionMinAggregate } from "../outputs/EstimatedBreedingValueDefinitionMinAggregate";

@TypeGraphQL.ObjectType("AggregateEstimatedBreedingValueDefinition", {})
export class AggregateEstimatedBreedingValueDefinition {
  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionCountAggregate,
    {
      nullable: true,
    },
  )
  _count!: EstimatedBreedingValueDefinitionCountAggregate | null;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionMinAggregate, {
    nullable: true,
  })
  _min!: EstimatedBreedingValueDefinitionMinAggregate | null;

  @TypeGraphQL.Field((_type) => EstimatedBreedingValueDefinitionMaxAggregate, {
    nullable: true,
  })
  _max!: EstimatedBreedingValueDefinitionMaxAggregate | null;
}

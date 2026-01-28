import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { EstimatedBreedingValueDefinition } from "../models/EstimatedBreedingValueDefinition";
import { LivestockUnit } from "../models/LivestockUnit";

@TypeGraphQL.ObjectType("EstimatedBreedingValueResult", {})
export class EstimatedBreedingValueResult {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  ebv?: EstimatedBreedingValueDefinition;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  estimatedBreedingValueDefinitionId!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  value!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  percentile!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  accuracy!: number;

  livestockUnit?: LivestockUnit;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitId!: string;
}

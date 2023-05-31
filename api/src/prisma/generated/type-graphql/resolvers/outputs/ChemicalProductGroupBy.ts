import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductAvgAggregate } from "../outputs/ChemicalProductAvgAggregate";
import { ChemicalProductCountAggregate } from "../outputs/ChemicalProductCountAggregate";
import { ChemicalProductMaxAggregate } from "../outputs/ChemicalProductMaxAggregate";
import { ChemicalProductMinAggregate } from "../outputs/ChemicalProductMinAggregate";
import { ChemicalProductSumAggregate } from "../outputs/ChemicalProductSumAggregate";

@TypeGraphQL.ObjectType("ChemicalProductGroupBy", {
  isAbstract: true,
})
export class ChemicalProductGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  chemicalTreatmentId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  manufacturer!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  product_name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  serial_number!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  volume_ml!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  cost!: number | null;

  @TypeGraphQL.Field((_type) => ChemicalProductCountAggregate, {
    nullable: true,
  })
  _count!: ChemicalProductCountAggregate | null;

  @TypeGraphQL.Field((_type) => ChemicalProductAvgAggregate, {
    nullable: true,
  })
  _avg!: ChemicalProductAvgAggregate | null;

  @TypeGraphQL.Field((_type) => ChemicalProductSumAggregate, {
    nullable: true,
  })
  _sum!: ChemicalProductSumAggregate | null;

  @TypeGraphQL.Field((_type) => ChemicalProductMinAggregate, {
    nullable: true,
  })
  _min!: ChemicalProductMinAggregate | null;

  @TypeGraphQL.Field((_type) => ChemicalProductMaxAggregate, {
    nullable: true,
  })
  _max!: ChemicalProductMaxAggregate | null;
}

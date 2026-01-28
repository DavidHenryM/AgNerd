import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductAvgAggregate } from "../outputs/ChemicalProductAvgAggregate";
import { ChemicalProductCountAggregate } from "../outputs/ChemicalProductCountAggregate";
import { ChemicalProductMaxAggregate } from "../outputs/ChemicalProductMaxAggregate";
import { ChemicalProductMinAggregate } from "../outputs/ChemicalProductMinAggregate";
import { ChemicalProductSumAggregate } from "../outputs/ChemicalProductSumAggregate";
import { ChemicalManufacturer } from "../../enums/ChemicalManufacturer";
import { ChemicalProductName } from "../../enums/ChemicalProductName";
import { ChemicalType } from "../../enums/ChemicalType";

@TypeGraphQL.ObjectType("ChemicalProductGroupBy", {})
export class ChemicalProductGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => ChemicalManufacturer, {
    nullable: false,
  })
  manufacturer!: "BOEHRINGER_INGLEHEIM";

  @TypeGraphQL.Field((_type) => ChemicalProductName, {
    nullable: false,
  })
  productName!: "AVOMEC_PLUS_POUR_ON";

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  serialNumber!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  batchNumber!: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  volumeMl!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  cost!: number | null;

  @TypeGraphQL.Field((_type) => ChemicalType, {
    nullable: false,
  })
  type!: "DRENCH" | "VACCINE" | "SUPPLEMENT" | "ANTIBIOTICS";

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  witholdingPeriodDays!: number;

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

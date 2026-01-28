import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalManufacturer } from "../../enums/ChemicalManufacturer";
import { ChemicalProductName } from "../../enums/ChemicalProductName";
import { ChemicalType } from "../../enums/ChemicalType";

@TypeGraphQL.ObjectType("ChemicalProductMinAggregate", {})
export class ChemicalProductMinAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => ChemicalManufacturer, {
    nullable: true,
  })
  manufacturer!: "BOEHRINGER_INGLEHEIM" | null;

  @TypeGraphQL.Field((_type) => ChemicalProductName, {
    nullable: true,
  })
  productName!: "AVOMEC_PLUS_POUR_ON" | null;

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
    nullable: true,
  })
  type!: "DRENCH" | "VACCINE" | "SUPPLEMENT" | "ANTIBIOTICS" | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  witholdingPeriodDays!: number | null;
}

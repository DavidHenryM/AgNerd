import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalManufacturer } from "../../enums/ChemicalManufacturer";
import { ChemicalProductName } from "../../enums/ChemicalProductName";
import { ChemicalType } from "../../enums/ChemicalType";

@TypeGraphQL.InputType("ChemicalProductCreateManyInput", {})
export class ChemicalProductCreateManyInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

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
  serialNumber?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  batchNumber?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  volumeMl?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  cost?: number | undefined;

  @TypeGraphQL.Field((_type) => ChemicalType, {
    nullable: false,
  })
  type!: "DRENCH" | "VACCINE" | "SUPPLEMENT" | "ANTIBIOTICS";

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  witholdingPeriodDays?: number | undefined;
}

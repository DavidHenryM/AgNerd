import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { ActiveIngredient } from "../models/ActiveIngredient";
import { ChemicalTreatment } from "../models/ChemicalTreatment";
import { ChemicalManufacturer } from "../enums/ChemicalManufacturer";
import { ChemicalProductName } from "../enums/ChemicalProductName";
import { ChemicalType } from "../enums/ChemicalType";
import { ChemicalProductCount } from "../resolvers/outputs/ChemicalProductCount";

@TypeGraphQL.ObjectType("ChemicalProduct", {})
export class ChemicalProduct {
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
  serialNumber?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  batchNumber?: string | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  volumeMl?: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: true,
  })
  cost?: number | null;

  @TypeGraphQL.Field((_type) => ChemicalType, {
    nullable: false,
  })
  type!: "DRENCH" | "VACCINE" | "SUPPLEMENT" | "ANTIBIOTICS";

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  witholdingPeriodDays!: number;

  activeIngredients?: ActiveIngredient[];

  ChemicalTreatment?: ChemicalTreatment[];

  @TypeGraphQL.Field((_type) => ChemicalProductCount, {
    nullable: true,
  })
  _count?: ChemicalProductCount | null;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { ChemicalProduct } from "../models/ChemicalProduct";
import { LivestockUnit } from "../models/LivestockUnit";
import { ApplicationMethod } from "../enums/ApplicationMethod";

@TypeGraphQL.ObjectType("ChemicalTreatment", {})
export class ChemicalTreatment {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  liveStockUnit?: LivestockUnit;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitId!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  treatmentDate!: Date;

  @TypeGraphQL.Field((_type) => ApplicationMethod, {
    nullable: false,
  })
  applicationMethod!:
    | "ORAL"
    | "TRANSDERMAL"
    | "SUB_CUT_INJECTION"
    | "INTRAVENUS_INJECTION";

  product?: ChemicalProduct;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  chemicalProductId!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  volumeMl!: number;
}

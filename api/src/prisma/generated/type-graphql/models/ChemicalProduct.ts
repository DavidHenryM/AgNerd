import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { ChemicalTreatment } from "../models/ChemicalTreatment";

@TypeGraphQL.ObjectType("ChemicalProduct", {
  isAbstract: true,
})
export class ChemicalProduct {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  treatment?: ChemicalTreatment;

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
  cost?: number | null;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumChemicalTypeFilter } from "../inputs/NestedEnumChemicalTypeFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { ChemicalType } from "../../enums/ChemicalType";

@TypeGraphQL.InputType("NestedEnumChemicalTypeWithAggregatesFilter", {})
export class NestedEnumChemicalTypeWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => ChemicalType, {
    nullable: true,
  })
  equals?: "DRENCH" | "VACCINE" | "SUPPLEMENT" | "ANTIBIOTICS" | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalType], {
    nullable: true,
  })
  in?: Array<"DRENCH" | "VACCINE" | "SUPPLEMENT" | "ANTIBIOTICS"> | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalType], {
    nullable: true,
  })
  notIn?:
    | Array<"DRENCH" | "VACCINE" | "SUPPLEMENT" | "ANTIBIOTICS">
    | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumChemicalTypeWithAggregatesFilter, {
    nullable: true,
  })
  not?: NestedEnumChemicalTypeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumChemicalTypeFilter, {
    nullable: true,
  })
  _min?: NestedEnumChemicalTypeFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumChemicalTypeFilter, {
    nullable: true,
  })
  _max?: NestedEnumChemicalTypeFilter | undefined;
}

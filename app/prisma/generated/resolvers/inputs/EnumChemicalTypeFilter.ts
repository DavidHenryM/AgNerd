import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumChemicalTypeFilter } from "../inputs/NestedEnumChemicalTypeFilter";
import { ChemicalType } from "../../enums/ChemicalType";

@TypeGraphQL.InputType("EnumChemicalTypeFilter", {})
export class EnumChemicalTypeFilter {
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

  @TypeGraphQL.Field((_type) => NestedEnumChemicalTypeFilter, {
    nullable: true,
  })
  not?: NestedEnumChemicalTypeFilter | undefined;
}

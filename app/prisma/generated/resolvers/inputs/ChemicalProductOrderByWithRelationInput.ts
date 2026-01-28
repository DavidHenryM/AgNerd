import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ActiveIngredientOrderByRelationAggregateInput } from "../inputs/ActiveIngredientOrderByRelationAggregateInput";
import { ChemicalTreatmentOrderByRelationAggregateInput } from "../inputs/ChemicalTreatmentOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ChemicalProductOrderByWithRelationInput", {})
export class ChemicalProductOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  manufacturer?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  productName?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  serialNumber?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  batchNumber?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  volumeMl?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  cost?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  type?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  witholdingPeriodDays?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => ActiveIngredientOrderByRelationAggregateInput, {
    nullable: true,
  })
  activeIngredients?: ActiveIngredientOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentOrderByRelationAggregateInput,
    {
      nullable: true,
    },
  )
  ChemicalTreatment?:
    | ChemicalTreatmentOrderByRelationAggregateInput
    | undefined;
}

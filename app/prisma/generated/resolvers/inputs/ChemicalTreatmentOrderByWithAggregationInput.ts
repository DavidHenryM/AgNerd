import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalTreatmentAvgOrderByAggregateInput } from "../inputs/ChemicalTreatmentAvgOrderByAggregateInput";
import { ChemicalTreatmentCountOrderByAggregateInput } from "../inputs/ChemicalTreatmentCountOrderByAggregateInput";
import { ChemicalTreatmentMaxOrderByAggregateInput } from "../inputs/ChemicalTreatmentMaxOrderByAggregateInput";
import { ChemicalTreatmentMinOrderByAggregateInput } from "../inputs/ChemicalTreatmentMinOrderByAggregateInput";
import { ChemicalTreatmentSumOrderByAggregateInput } from "../inputs/ChemicalTreatmentSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ChemicalTreatmentOrderByWithAggregationInput", {})
export class ChemicalTreatmentOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  livestockUnitId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  treatmentDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  applicationMethod?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  chemicalProductId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  volumeMl?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: ChemicalTreatmentCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: ChemicalTreatmentAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: ChemicalTreatmentMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: ChemicalTreatmentMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalTreatmentSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: ChemicalTreatmentSumOrderByAggregateInput | undefined;
}

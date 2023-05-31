import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ChemicalProductAvgOrderByAggregateInput } from "../inputs/ChemicalProductAvgOrderByAggregateInput";
import { ChemicalProductCountOrderByAggregateInput } from "../inputs/ChemicalProductCountOrderByAggregateInput";
import { ChemicalProductMaxOrderByAggregateInput } from "../inputs/ChemicalProductMaxOrderByAggregateInput";
import { ChemicalProductMinOrderByAggregateInput } from "../inputs/ChemicalProductMinOrderByAggregateInput";
import { ChemicalProductSumOrderByAggregateInput } from "../inputs/ChemicalProductSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ChemicalProductOrderByWithAggregationInput", {
  isAbstract: true,
})
export class ChemicalProductOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  chemicalTreatmentId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  manufacturer?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  product_name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  serial_number?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  volume_ml?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  cost?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: ChemicalProductCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductAvgOrderByAggregateInput, {
    nullable: true,
  })
  _avg?: ChemicalProductAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: ChemicalProductMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: ChemicalProductMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ChemicalProductSumOrderByAggregateInput, {
    nullable: true,
  })
  _sum?: ChemicalProductSumOrderByAggregateInput | undefined;
}

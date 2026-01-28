import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { VerificationCountOrderByAggregateInput } from "../inputs/VerificationCountOrderByAggregateInput";
import { VerificationMaxOrderByAggregateInput } from "../inputs/VerificationMaxOrderByAggregateInput";
import { VerificationMinOrderByAggregateInput } from "../inputs/VerificationMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("VerificationOrderByWithAggregationInput", {})
export class VerificationOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  identifier?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  value?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  expiresAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => VerificationCountOrderByAggregateInput, {
    nullable: true,
  })
  _count?: VerificationCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => VerificationMaxOrderByAggregateInput, {
    nullable: true,
  })
  _max?: VerificationMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => VerificationMinOrderByAggregateInput, {
    nullable: true,
  })
  _min?: VerificationMinOrderByAggregateInput | undefined;
}

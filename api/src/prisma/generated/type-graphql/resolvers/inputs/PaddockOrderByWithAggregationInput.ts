import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PaddockCountOrderByAggregateInput } from "../inputs/PaddockCountOrderByAggregateInput";
import { PaddockMaxOrderByAggregateInput } from "../inputs/PaddockMaxOrderByAggregateInput";
import { PaddockMinOrderByAggregateInput } from "../inputs/PaddockMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("PaddockOrderByWithAggregationInput", {
  isAbstract: true
})
export class PaddockOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => PaddockCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: PaddockCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => PaddockMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: PaddockMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => PaddockMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: PaddockMinOrderByAggregateInput | undefined;
}

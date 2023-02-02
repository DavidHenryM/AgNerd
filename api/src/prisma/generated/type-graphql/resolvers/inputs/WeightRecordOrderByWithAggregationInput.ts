import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordAvgOrderByAggregateInput } from "../inputs/WeightRecordAvgOrderByAggregateInput";
import { WeightRecordCountOrderByAggregateInput } from "../inputs/WeightRecordCountOrderByAggregateInput";
import { WeightRecordMaxOrderByAggregateInput } from "../inputs/WeightRecordMaxOrderByAggregateInput";
import { WeightRecordMinOrderByAggregateInput } from "../inputs/WeightRecordMinOrderByAggregateInput";
import { WeightRecordSumOrderByAggregateInput } from "../inputs/WeightRecordSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("WeightRecordOrderByWithAggregationInput", {
  isAbstract: true
})
export class WeightRecordOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  weight?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dateMeasured?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  method?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  livestockUnitId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => WeightRecordCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: WeightRecordCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => WeightRecordAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: WeightRecordAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => WeightRecordMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: WeightRecordMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => WeightRecordMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: WeightRecordMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => WeightRecordSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: WeightRecordSumOrderByAggregateInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCountOrderByAggregateInput } from "../inputs/MobCountOrderByAggregateInput";
import { MobMaxOrderByAggregateInput } from "../inputs/MobMaxOrderByAggregateInput";
import { MobMinOrderByAggregateInput } from "../inputs/MobMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("MobOrderByWithAggregationInput", {
  isAbstract: true
})
export class MobOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  comment?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  grazeIds?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => MobCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: MobCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => MobMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: MobMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => MobMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: MobMinOrderByAggregateInput | undefined;
}

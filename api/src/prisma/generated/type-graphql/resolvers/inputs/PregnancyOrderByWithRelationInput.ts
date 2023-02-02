import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitOrderByRelationAggregateInput } from "../inputs/LivestockUnitOrderByRelationAggregateInput";
import { PregnancyTestOrderByRelationAggregateInput } from "../inputs/PregnancyTestOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("PregnancyOrderByWithRelationInput", {
  isAbstract: true
})
export class PregnancyOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  earliestPossibleConception?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  latestPossibleConception?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  conception?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dueDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  earliestPossibleBirth?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  latestPossibleBirth?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  parentId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitOrderByRelationAggregateInput, {
    nullable: true
  })
  parents?: LivestockUnitOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  pregnancySireId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => PregnancyTestOrderByRelationAggregateInput, {
    nullable: true
  })
  pregnancyTest?: PregnancyTestOrderByRelationAggregateInput | undefined;
}

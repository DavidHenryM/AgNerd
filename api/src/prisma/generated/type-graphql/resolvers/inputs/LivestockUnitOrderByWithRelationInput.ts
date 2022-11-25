import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedOrderByWithRelationInput } from "../inputs/BreedOrderByWithRelationInput";
import { MobOrderByWithRelationInput } from "../inputs/MobOrderByWithRelationInput";
import { WeightRecordOrderByRelationAggregateInput } from "../inputs/WeightRecordOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LivestockUnitOrderByWithRelationInput", {
  isAbstract: true
})
export class LivestockUnitOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  nlisid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => BreedOrderByWithRelationInput, {
    nullable: true
  })
  breed?: BreedOrderByWithRelationInput | undefined;

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
  sex?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  birthdate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  desexed?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  parentId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitOrderByWithRelationInput, {
    nullable: true
  })
  sire?: LivestockUnitOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitOrderByWithRelationInput, {
    nullable: true
  })
  dam?: LivestockUnitOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => MobOrderByWithRelationInput, {
    nullable: true
  })
  mob?: MobOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  livestockUnitId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => WeightRecordOrderByRelationAggregateInput, {
    nullable: true
  })
  weights?: WeightRecordOrderByRelationAggregateInput | undefined;
}

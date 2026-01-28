import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedOrderByWithRelationInput } from "../inputs/BreedOrderByWithRelationInput";
import { ChemicalTreatmentOrderByRelationAggregateInput } from "../inputs/ChemicalTreatmentOrderByRelationAggregateInput";
import { EstimatedBreedingValueResultOrderByRelationAggregateInput } from "../inputs/EstimatedBreedingValueResultOrderByRelationAggregateInput";
import { LivestockUnitOrderByRelationAggregateInput } from "../inputs/LivestockUnitOrderByRelationAggregateInput";
import { MobOrderByWithRelationInput } from "../inputs/MobOrderByWithRelationInput";
import { PregnancyOrderByRelationAggregateInput } from "../inputs/PregnancyOrderByRelationAggregateInput";
import { WeightRecordOrderByRelationAggregateInput } from "../inputs/WeightRecordOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("LivestockUnitOrderByWithRelationInput", {})
export class LivestockUnitOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  nlisId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdLine1?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdLine2?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdLine3?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdBackgroundColour?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  visualIdTextColour?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  class?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  commercialClass?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  comment?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  sex?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  birthDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  desexed?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  sireId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  damId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  mobRef?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  pregnancyId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  drySheepEquivalent?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  purchasePrice?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  purchaseDate?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  angusTechId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  active?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => BreedOrderByWithRelationInput, {
    nullable: true,
  })
  breed?: BreedOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitOrderByWithRelationInput, {
    nullable: true,
  })
  sire?: LivestockUnitOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitOrderByRelationAggregateInput, {
    nullable: true,
  })
  sired?: LivestockUnitOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitOrderByWithRelationInput, {
    nullable: true,
  })
  dam?: LivestockUnitOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitOrderByRelationAggregateInput, {
    nullable: true,
  })
  birthed?: LivestockUnitOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => MobOrderByWithRelationInput, {
    nullable: true,
  })
  mob?: MobOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => PregnancyOrderByRelationAggregateInput, {
    nullable: true,
  })
  pregnancy?: PregnancyOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => WeightRecordOrderByRelationAggregateInput, {
    nullable: true,
  })
  weights?: WeightRecordOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentOrderByRelationAggregateInput,
    {
      nullable: true,
    },
  )
  treatments?: ChemicalTreatmentOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueResultOrderByRelationAggregateInput,
    {
      nullable: true,
    },
  )
  estimatedBreedingValueResult?:
    | EstimatedBreedingValueResultOrderByRelationAggregateInput
    | undefined;
}

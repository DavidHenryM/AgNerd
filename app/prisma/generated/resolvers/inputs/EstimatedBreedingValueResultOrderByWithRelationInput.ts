import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EstimatedBreedingValueDefinitionOrderByWithRelationInput } from "../inputs/EstimatedBreedingValueDefinitionOrderByWithRelationInput";
import { LivestockUnitOrderByWithRelationInput } from "../inputs/LivestockUnitOrderByWithRelationInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType(
  "EstimatedBreedingValueResultOrderByWithRelationInput",
  {},
)
export class EstimatedBreedingValueResultOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  estimatedBreedingValueDefinitionId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  value?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  percentile?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  accuracy?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
  livestockUnitId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(
    (_type) => EstimatedBreedingValueDefinitionOrderByWithRelationInput,
    {
      nullable: true,
    },
  )
  ebv?: EstimatedBreedingValueDefinitionOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => LivestockUnitOrderByWithRelationInput, {
    nullable: true,
  })
  livestockUnit?: LivestockUnitOrderByWithRelationInput | undefined;
}

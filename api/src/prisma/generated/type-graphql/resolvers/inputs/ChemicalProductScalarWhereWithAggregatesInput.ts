import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FloatNullableWithAggregatesFilter } from "../inputs/FloatNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("ChemicalProductScalarWhereWithAggregatesInput", {
  isAbstract: true,
})
export class ChemicalProductScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(
    (_type) => [ChemicalProductScalarWhereWithAggregatesInput],
    {
      nullable: true,
    }
  )
  AND?: ChemicalProductScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalProductScalarWhereWithAggregatesInput],
    {
      nullable: true,
    }
  )
  OR?: ChemicalProductScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalProductScalarWhereWithAggregatesInput],
    {
      nullable: true,
    }
  )
  NOT?: ChemicalProductScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  chemicalTreatmentId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  manufacturer?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  product_name?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringWithAggregatesFilter, {
    nullable: true,
  })
  serial_number?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
  volume_ml?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => FloatNullableWithAggregatesFilter, {
    nullable: true,
  })
  cost?: FloatNullableWithAggregatesFilter | undefined;
}

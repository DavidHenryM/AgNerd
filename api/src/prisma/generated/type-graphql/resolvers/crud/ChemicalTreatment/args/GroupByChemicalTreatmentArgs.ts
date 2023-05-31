import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalTreatmentOrderByWithAggregationInput } from "../../../inputs/ChemicalTreatmentOrderByWithAggregationInput";
import { ChemicalTreatmentScalarWhereWithAggregatesInput } from "../../../inputs/ChemicalTreatmentScalarWhereWithAggregatesInput";
import { ChemicalTreatmentWhereInput } from "../../../inputs/ChemicalTreatmentWhereInput";
import { ChemicalTreatmentScalarFieldEnum } from "../../../../enums/ChemicalTreatmentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByChemicalTreatmentArgs {
  @TypeGraphQL.Field((_type) => ChemicalTreatmentWhereInput, {
    nullable: true,
  })
  where?: ChemicalTreatmentWhereInput | undefined;

  @TypeGraphQL.Field(
    (_type) => [ChemicalTreatmentOrderByWithAggregationInput],
    {
      nullable: true,
    }
  )
  orderBy?: ChemicalTreatmentOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalTreatmentScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    | "id"
    | "livestockUnitId"
    | "treatmentDate"
    | "applicationMethod"
    | "volume_ml"
    | "witholdingPeriodDays"
  >;

  @TypeGraphQL.Field(
    (_type) => ChemicalTreatmentScalarWhereWithAggregatesInput,
    {
      nullable: true,
    }
  )
  having?: ChemicalTreatmentScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

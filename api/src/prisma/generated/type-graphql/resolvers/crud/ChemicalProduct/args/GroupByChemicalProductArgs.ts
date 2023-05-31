import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ChemicalProductOrderByWithAggregationInput } from "../../../inputs/ChemicalProductOrderByWithAggregationInput";
import { ChemicalProductScalarWhereWithAggregatesInput } from "../../../inputs/ChemicalProductScalarWhereWithAggregatesInput";
import { ChemicalProductWhereInput } from "../../../inputs/ChemicalProductWhereInput";
import { ChemicalProductScalarFieldEnum } from "../../../../enums/ChemicalProductScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByChemicalProductArgs {
  @TypeGraphQL.Field((_type) => ChemicalProductWhereInput, {
    nullable: true,
  })
  where?: ChemicalProductWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalProductOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: ChemicalProductOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ChemicalProductScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    | "id"
    | "chemicalTreatmentId"
    | "manufacturer"
    | "product_name"
    | "serial_number"
    | "volume_ml"
    | "cost"
  >;

  @TypeGraphQL.Field((_type) => ChemicalProductScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: ChemicalProductScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

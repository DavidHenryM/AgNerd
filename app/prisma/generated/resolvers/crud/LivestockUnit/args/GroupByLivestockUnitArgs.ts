import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitOrderByWithAggregationInput } from "../../../inputs/LivestockUnitOrderByWithAggregationInput";
import { LivestockUnitScalarWhereWithAggregatesInput } from "../../../inputs/LivestockUnitScalarWhereWithAggregatesInput";
import { LivestockUnitWhereInput } from "../../../inputs/LivestockUnitWhereInput";
import { LivestockUnitScalarFieldEnum } from "../../../../enums/LivestockUnitScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByLivestockUnitArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: LivestockUnitOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [LivestockUnitScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    | "id"
    | "nlisId"
    | "visualIdLine1"
    | "visualIdLine2"
    | "visualIdLine3"
    | "visualIdBackgroundColour"
    | "visualIdTextColour"
    | "class"
    | "commercialClass"
    | "name"
    | "comment"
    | "sex"
    | "birthDate"
    | "desexed"
    | "sireId"
    | "damId"
    | "mobRef"
    | "pregnancyId"
    | "drySheepEquivalent"
    | "purchasePrice"
    | "purchaseDate"
    | "angusTechId"
    | "active"
  >;

  @TypeGraphQL.Field((_type) => LivestockUnitScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: LivestockUnitScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

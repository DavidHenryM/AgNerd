import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { FarmOrderByWithAggregationInput } from "../../../inputs/FarmOrderByWithAggregationInput";
import { FarmScalarWhereWithAggregatesInput } from "../../../inputs/FarmScalarWhereWithAggregatesInput";
import { FarmWhereInput } from "../../../inputs/FarmWhereInput";
import { FarmScalarFieldEnum } from "../../../../enums/FarmScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByFarmArgs {
  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  where?: FarmWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [FarmOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: FarmOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [FarmScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<
    "id" | "name" | "businessName" | "lotSectionPlan" | "abn" | "acn" | "pic"
  >;

  @TypeGraphQL.Field((_type) => FarmScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: FarmScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

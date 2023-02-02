import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyTestOrderByWithAggregationInput } from "../../../inputs/PregnancyTestOrderByWithAggregationInput";
import { PregnancyTestScalarWhereWithAggregatesInput } from "../../../inputs/PregnancyTestScalarWhereWithAggregatesInput";
import { PregnancyTestWhereInput } from "../../../inputs/PregnancyTestWhereInput";
import { PregnancyTestScalarFieldEnum } from "../../../../enums/PregnancyTestScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByPregnancyTestArgs {
  @TypeGraphQL.Field(_type => PregnancyTestWhereInput, {
    nullable: true
  })
  where?: PregnancyTestWhereInput | undefined;

  @TypeGraphQL.Field(_type => [PregnancyTestOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: PregnancyTestOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [PregnancyTestScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "testDate" | "testType" | "resultDate" | "result" | "pregnancyId" | "cost">;

  @TypeGraphQL.Field(_type => PregnancyTestScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: PregnancyTestScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

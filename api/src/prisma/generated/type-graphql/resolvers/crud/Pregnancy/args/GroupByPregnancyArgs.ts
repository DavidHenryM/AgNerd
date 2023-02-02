import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PregnancyOrderByWithAggregationInput } from "../../../inputs/PregnancyOrderByWithAggregationInput";
import { PregnancyScalarWhereWithAggregatesInput } from "../../../inputs/PregnancyScalarWhereWithAggregatesInput";
import { PregnancyWhereInput } from "../../../inputs/PregnancyWhereInput";
import { PregnancyScalarFieldEnum } from "../../../../enums/PregnancyScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByPregnancyArgs {
  @TypeGraphQL.Field(_type => PregnancyWhereInput, {
    nullable: true
  })
  where?: PregnancyWhereInput | undefined;

  @TypeGraphQL.Field(_type => [PregnancyOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: PregnancyOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [PregnancyScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "earliestPossibleConception" | "latestPossibleConception" | "conception" | "dueDate" | "earliestPossibleBirth" | "latestPossibleBirth" | "parentId" | "pregnancySireId">;

  @TypeGraphQL.Field(_type => PregnancyScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: PregnancyScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

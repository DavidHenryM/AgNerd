import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GrazeOrderByWithAggregationInput } from "../../../inputs/GrazeOrderByWithAggregationInput";
import { GrazeScalarWhereWithAggregatesInput } from "../../../inputs/GrazeScalarWhereWithAggregatesInput";
import { GrazeWhereInput } from "../../../inputs/GrazeWhereInput";
import { GrazeScalarFieldEnum } from "../../../../enums/GrazeScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByGrazeArgs {
  @TypeGraphQL.Field(_type => GrazeWhereInput, {
    nullable: true
  })
  where?: GrazeWhereInput | undefined;

  @TypeGraphQL.Field(_type => [GrazeOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: GrazeOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [GrazeScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "startDatetime" | "endDateTime" | "paddockId" | "mobIds">;

  @TypeGraphQL.Field(_type => GrazeScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: GrazeScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VisualIdOrderByWithAggregationInput } from "../../../inputs/VisualIdOrderByWithAggregationInput";
import { VisualIdScalarWhereWithAggregatesInput } from "../../../inputs/VisualIdScalarWhereWithAggregatesInput";
import { VisualIdWhereInput } from "../../../inputs/VisualIdWhereInput";
import { VisualIdScalarFieldEnum } from "../../../../enums/VisualIdScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByVisualIdArgs {
  @TypeGraphQL.Field(_type => VisualIdWhereInput, {
    nullable: true
  })
  where?: VisualIdWhereInput | undefined;

  @TypeGraphQL.Field(_type => [VisualIdOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: VisualIdOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [VisualIdScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "livestockUnitId" | "colour" | "number">;

  @TypeGraphQL.Field(_type => VisualIdScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: VisualIdScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PaddockOrderByWithAggregationInput } from "../../../inputs/PaddockOrderByWithAggregationInput";
import { PaddockScalarWhereWithAggregatesInput } from "../../../inputs/PaddockScalarWhereWithAggregatesInput";
import { PaddockWhereInput } from "../../../inputs/PaddockWhereInput";
import { PaddockScalarFieldEnum } from "../../../../enums/PaddockScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByPaddockArgs {
  @TypeGraphQL.Field(_type => PaddockWhereInput, {
    nullable: true
  })
  where?: PaddockWhereInput | undefined;

  @TypeGraphQL.Field(_type => [PaddockOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: PaddockOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [PaddockScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "name" | "areaHa" | "livestockUnitPositionId">;

  @TypeGraphQL.Field(_type => PaddockScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: PaddockScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

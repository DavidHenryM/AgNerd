import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { BreedOrderByWithAggregationInput } from "../../../inputs/BreedOrderByWithAggregationInput";
import { BreedScalarWhereWithAggregatesInput } from "../../../inputs/BreedScalarWhereWithAggregatesInput";
import { BreedWhereInput } from "../../../inputs/BreedWhereInput";
import { BreedScalarFieldEnum } from "../../../../enums/BreedScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByBreedArgs {
  @TypeGraphQL.Field(_type => BreedWhereInput, {
    nullable: true
  })
  where?: BreedWhereInput | undefined;

  @TypeGraphQL.Field(_type => [BreedOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: BreedOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [BreedScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "name" | "class" | "livestockUnitId">;

  @TypeGraphQL.Field(_type => BreedScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: BreedScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

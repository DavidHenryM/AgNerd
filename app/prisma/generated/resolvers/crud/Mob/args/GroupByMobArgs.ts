import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { MobOrderByWithAggregationInput } from "../../../inputs/MobOrderByWithAggregationInput";
import { MobScalarWhereWithAggregatesInput } from "../../../inputs/MobScalarWhereWithAggregatesInput";
import { MobWhereInput } from "../../../inputs/MobWhereInput";
import { MobScalarFieldEnum } from "../../../../enums/MobScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByMobArgs {
  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  where?: MobWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [MobOrderByWithAggregationInput], {
    nullable: true,
  })
  orderBy?: MobOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [MobScalarFieldEnum], {
    nullable: false,
  })
  by!: Array<"id" | "name" | "comment" | "grazeIds">;

  @TypeGraphQL.Field((_type) => MobScalarWhereWithAggregatesInput, {
    nullable: true,
  })
  having?: MobScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

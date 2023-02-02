import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionOrderByWithRelationInput } from "../../../inputs/LivestockUnitPositionOrderByWithRelationInput";
import { LivestockUnitPositionWhereInput } from "../../../inputs/LivestockUnitPositionWhereInput";
import { LivestockUnitPositionWhereUniqueInput } from "../../../inputs/LivestockUnitPositionWhereUniqueInput";
import { LivestockUnitPositionScalarFieldEnum } from "../../../../enums/LivestockUnitPositionScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstLivestockUnitPositionArgs {
  @TypeGraphQL.Field(_type => LivestockUnitPositionWhereInput, {
    nullable: true
  })
  where?: LivestockUnitPositionWhereInput | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitPositionOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: LivestockUnitPositionOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => LivestockUnitPositionWhereUniqueInput, {
    nullable: true
  })
  cursor?: LivestockUnitPositionWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [LivestockUnitPositionScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "date"> | undefined;
}

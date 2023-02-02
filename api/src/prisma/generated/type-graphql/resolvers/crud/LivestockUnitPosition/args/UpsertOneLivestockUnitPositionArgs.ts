import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionCreateInput } from "../../../inputs/LivestockUnitPositionCreateInput";
import { LivestockUnitPositionUpdateInput } from "../../../inputs/LivestockUnitPositionUpdateInput";
import { LivestockUnitPositionWhereUniqueInput } from "../../../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneLivestockUnitPositionArgs {
  @TypeGraphQL.Field(_type => LivestockUnitPositionWhereUniqueInput, {
    nullable: false
  })
  where!: LivestockUnitPositionWhereUniqueInput;

  @TypeGraphQL.Field(_type => LivestockUnitPositionCreateInput, {
    nullable: false
  })
  create!: LivestockUnitPositionCreateInput;

  @TypeGraphQL.Field(_type => LivestockUnitPositionUpdateInput, {
    nullable: false
  })
  update!: LivestockUnitPositionUpdateInput;
}

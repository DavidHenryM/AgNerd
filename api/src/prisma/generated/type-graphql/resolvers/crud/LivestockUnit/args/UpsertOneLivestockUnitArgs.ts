import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitCreateInput } from "../../../inputs/LivestockUnitCreateInput";
import { LivestockUnitUpdateInput } from "../../../inputs/LivestockUnitUpdateInput";
import { LivestockUnitWhereUniqueInput } from "../../../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneLivestockUnitArgs {
  @TypeGraphQL.Field(_type => LivestockUnitWhereUniqueInput, {
    nullable: false
  })
  where!: LivestockUnitWhereUniqueInput;

  @TypeGraphQL.Field(_type => LivestockUnitCreateInput, {
    nullable: false
  })
  create!: LivestockUnitCreateInput;

  @TypeGraphQL.Field(_type => LivestockUnitUpdateInput, {
    nullable: false
  })
  update!: LivestockUnitUpdateInput;
}

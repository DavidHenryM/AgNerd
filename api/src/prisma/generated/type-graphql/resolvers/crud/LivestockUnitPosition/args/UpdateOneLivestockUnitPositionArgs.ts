import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionUpdateInput } from "../../../inputs/LivestockUnitPositionUpdateInput";
import { LivestockUnitPositionWhereUniqueInput } from "../../../inputs/LivestockUnitPositionWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneLivestockUnitPositionArgs {
  @TypeGraphQL.Field(_type => LivestockUnitPositionUpdateInput, {
    nullable: false
  })
  data!: LivestockUnitPositionUpdateInput;

  @TypeGraphQL.Field(_type => LivestockUnitPositionWhereUniqueInput, {
    nullable: false
  })
  where!: LivestockUnitPositionWhereUniqueInput;
}

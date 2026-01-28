import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitUpdateInput } from "../../../inputs/LivestockUnitUpdateInput";
import { LivestockUnitWhereUniqueInput } from "../../../inputs/LivestockUnitWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneLivestockUnitArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitUpdateInput, {
    nullable: false,
  })
  data!: LivestockUnitUpdateInput;

  @TypeGraphQL.Field((_type) => LivestockUnitWhereUniqueInput, {
    nullable: false,
  })
  where!: LivestockUnitWhereUniqueInput;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitCreateInput } from "../../../inputs/LivestockUnitCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneLivestockUnitArgs {
  @TypeGraphQL.Field(_type => LivestockUnitCreateInput, {
    nullable: false
  })
  data!: LivestockUnitCreateInput;
}

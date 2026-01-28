import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionCreateInput } from "../../../inputs/LivestockUnitPositionCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneLivestockUnitPositionArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitPositionCreateInput, {
    nullable: false,
  })
  data!: LivestockUnitPositionCreateInput;
}

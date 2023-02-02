import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionCreateManyInput } from "../../../inputs/LivestockUnitPositionCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyLivestockUnitPositionArgs {
  @TypeGraphQL.Field(_type => [LivestockUnitPositionCreateManyInput], {
    nullable: false
  })
  data!: LivestockUnitPositionCreateManyInput[];
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitCreateManyInput } from "../../../inputs/LivestockUnitCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyLivestockUnitArgs {
  @TypeGraphQL.Field((_type) => [LivestockUnitCreateManyInput], {
    nullable: false,
  })
  data!: LivestockUnitCreateManyInput[];
}

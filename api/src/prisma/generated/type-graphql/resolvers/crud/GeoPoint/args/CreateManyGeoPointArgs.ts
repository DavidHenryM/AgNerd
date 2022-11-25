import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointCreateManyInput } from "../../../inputs/GeoPointCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyGeoPointArgs {
  @TypeGraphQL.Field(_type => [GeoPointCreateManyInput], {
    nullable: false
  })
  data!: GeoPointCreateManyInput[];
}

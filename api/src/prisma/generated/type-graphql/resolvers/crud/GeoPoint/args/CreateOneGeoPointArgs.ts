import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointCreateInput } from "../../../inputs/GeoPointCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneGeoPointArgs {
  @TypeGraphQL.Field(_type => GeoPointCreateInput, {
    nullable: false
  })
  data!: GeoPointCreateInput;
}

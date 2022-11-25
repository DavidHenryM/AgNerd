import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointWhereUniqueInput } from "../../../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOneGeoPointArgs {
  @TypeGraphQL.Field(_type => GeoPointWhereUniqueInput, {
    nullable: false
  })
  where!: GeoPointWhereUniqueInput;
}

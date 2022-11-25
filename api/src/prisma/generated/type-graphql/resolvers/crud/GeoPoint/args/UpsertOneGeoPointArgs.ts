import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointCreateInput } from "../../../inputs/GeoPointCreateInput";
import { GeoPointUpdateInput } from "../../../inputs/GeoPointUpdateInput";
import { GeoPointWhereUniqueInput } from "../../../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneGeoPointArgs {
  @TypeGraphQL.Field(_type => GeoPointWhereUniqueInput, {
    nullable: false
  })
  where!: GeoPointWhereUniqueInput;

  @TypeGraphQL.Field(_type => GeoPointCreateInput, {
    nullable: false
  })
  create!: GeoPointCreateInput;

  @TypeGraphQL.Field(_type => GeoPointUpdateInput, {
    nullable: false
  })
  update!: GeoPointUpdateInput;
}

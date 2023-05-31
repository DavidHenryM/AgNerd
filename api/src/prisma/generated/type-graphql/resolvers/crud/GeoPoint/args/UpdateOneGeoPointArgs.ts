import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointUpdateInput } from "../../../inputs/GeoPointUpdateInput";
import { GeoPointWhereUniqueInput } from "../../../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneGeoPointArgs {
  @TypeGraphQL.Field((_type) => GeoPointUpdateInput, {
    nullable: false,
  })
  data!: GeoPointUpdateInput;

  @TypeGraphQL.Field((_type) => GeoPointWhereUniqueInput, {
    nullable: false,
  })
  where!: GeoPointWhereUniqueInput;
}

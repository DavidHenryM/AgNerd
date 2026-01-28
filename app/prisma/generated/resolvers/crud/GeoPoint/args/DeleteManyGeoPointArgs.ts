import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointWhereInput } from "../../../inputs/GeoPointWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyGeoPointArgs {
  @TypeGraphQL.Field((_type) => GeoPointWhereInput, {
    nullable: true,
  })
  where?: GeoPointWhereInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointUpdateManyMutationInput } from "../../../inputs/GeoPointUpdateManyMutationInput";
import { GeoPointWhereInput } from "../../../inputs/GeoPointWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyGeoPointArgs {
  @TypeGraphQL.Field(_type => GeoPointUpdateManyMutationInput, {
    nullable: false
  })
  data!: GeoPointUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => GeoPointWhereInput, {
    nullable: true
  })
  where?: GeoPointWhereInput | undefined;
}

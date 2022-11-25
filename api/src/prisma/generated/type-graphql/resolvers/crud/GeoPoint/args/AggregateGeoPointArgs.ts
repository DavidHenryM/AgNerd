import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointOrderByWithRelationInput } from "../../../inputs/GeoPointOrderByWithRelationInput";
import { GeoPointWhereInput } from "../../../inputs/GeoPointWhereInput";
import { GeoPointWhereUniqueInput } from "../../../inputs/GeoPointWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateGeoPointArgs {
  @TypeGraphQL.Field(_type => GeoPointWhereInput, {
    nullable: true
  })
  where?: GeoPointWhereInput | undefined;

  @TypeGraphQL.Field(_type => [GeoPointOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: GeoPointOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => GeoPointWhereUniqueInput, {
    nullable: true
  })
  cursor?: GeoPointWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

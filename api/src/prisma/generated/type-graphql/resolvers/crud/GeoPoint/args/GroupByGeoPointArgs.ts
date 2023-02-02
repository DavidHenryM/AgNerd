import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GeoPointOrderByWithAggregationInput } from "../../../inputs/GeoPointOrderByWithAggregationInput";
import { GeoPointScalarWhereWithAggregatesInput } from "../../../inputs/GeoPointScalarWhereWithAggregatesInput";
import { GeoPointWhereInput } from "../../../inputs/GeoPointWhereInput";
import { GeoPointScalarFieldEnum } from "../../../../enums/GeoPointScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByGeoPointArgs {
  @TypeGraphQL.Field(_type => GeoPointWhereInput, {
    nullable: true
  })
  where?: GeoPointWhereInput | undefined;

  @TypeGraphQL.Field(_type => [GeoPointOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: GeoPointOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [GeoPointScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "latitude" | "longitude" | "paddockId" | "livestockUnitPositionId">;

  @TypeGraphQL.Field(_type => GeoPointScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: GeoPointScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

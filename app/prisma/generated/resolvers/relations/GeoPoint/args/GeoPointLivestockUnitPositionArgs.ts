import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LivestockUnitPositionWhereInput } from "../../../inputs/LivestockUnitPositionWhereInput";

@TypeGraphQL.ArgsType()
export class GeoPointLivestockUnitPositionArgs {
  @TypeGraphQL.Field((_type) => LivestockUnitPositionWhereInput, {
    nullable: true,
  })
  where?: LivestockUnitPositionWhereInput | undefined;
}

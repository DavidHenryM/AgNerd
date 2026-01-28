import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordWhereInput } from "../../inputs/WeightRecordWhereInput";

@TypeGraphQL.ArgsType()
export class LivestockUnitCountWeightsArgs {
  @TypeGraphQL.Field((_type) => WeightRecordWhereInput, {
    nullable: true,
  })
  where?: WeightRecordWhereInput | undefined;
}

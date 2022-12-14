import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordOrderByWithRelationInput } from "../../../inputs/WeightRecordOrderByWithRelationInput";
import { WeightRecordWhereInput } from "../../../inputs/WeightRecordWhereInput";
import { WeightRecordWhereUniqueInput } from "../../../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateWeightRecordArgs {
  @TypeGraphQL.Field(_type => WeightRecordWhereInput, {
    nullable: true
  })
  where?: WeightRecordWhereInput | undefined;

  @TypeGraphQL.Field(_type => [WeightRecordOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: WeightRecordOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => WeightRecordWhereUniqueInput, {
    nullable: true
  })
  cursor?: WeightRecordWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}

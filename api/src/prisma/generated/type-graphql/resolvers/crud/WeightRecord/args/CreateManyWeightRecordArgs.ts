import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordCreateManyInput } from "../../../inputs/WeightRecordCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyWeightRecordArgs {
  @TypeGraphQL.Field(_type => [WeightRecordCreateManyInput], {
    nullable: false
  })
  data!: WeightRecordCreateManyInput[];
}

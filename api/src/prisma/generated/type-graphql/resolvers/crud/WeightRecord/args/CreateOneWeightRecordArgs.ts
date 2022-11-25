import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordCreateInput } from "../../../inputs/WeightRecordCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneWeightRecordArgs {
  @TypeGraphQL.Field(_type => WeightRecordCreateInput, {
    nullable: false
  })
  data!: WeightRecordCreateInput;
}

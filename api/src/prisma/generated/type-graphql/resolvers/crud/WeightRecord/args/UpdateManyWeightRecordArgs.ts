import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { WeightRecordUpdateManyMutationInput } from "../../../inputs/WeightRecordUpdateManyMutationInput";
import { WeightRecordWhereInput } from "../../../inputs/WeightRecordWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyWeightRecordArgs {
  @TypeGraphQL.Field((_type) => WeightRecordUpdateManyMutationInput, {
    nullable: false,
  })
  data!: WeightRecordUpdateManyMutationInput;

  @TypeGraphQL.Field((_type) => WeightRecordWhereInput, {
    nullable: true,
  })
  where?: WeightRecordWhereInput | undefined;
}

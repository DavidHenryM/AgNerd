import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordScalarWhereInput } from "../inputs/WeightRecordScalarWhereInput";
import { WeightRecordUpdateManyMutationInput } from "../inputs/WeightRecordUpdateManyMutationInput";

@TypeGraphQL.InputType(
  "WeightRecordUpdateManyWithWhereWithoutLivestockUnitInput",
  {},
)
export class WeightRecordUpdateManyWithWhereWithoutLivestockUnitInput {
  @TypeGraphQL.Field((_type) => WeightRecordScalarWhereInput, {
    nullable: false,
  })
  where!: WeightRecordScalarWhereInput;

  @TypeGraphQL.Field((_type) => WeightRecordUpdateManyMutationInput, {
    nullable: false,
  })
  data!: WeightRecordUpdateManyMutationInput;
}

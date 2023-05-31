import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordCreateWithoutLivestockUnitInput } from "../inputs/WeightRecordCreateWithoutLivestockUnitInput";
import { WeightRecordUpdateWithoutLivestockUnitInput } from "../inputs/WeightRecordUpdateWithoutLivestockUnitInput";
import { WeightRecordWhereUniqueInput } from "../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.InputType(
  "WeightRecordUpsertWithWhereUniqueWithoutLivestockUnitInput",
  {
    isAbstract: true,
  }
)
export class WeightRecordUpsertWithWhereUniqueWithoutLivestockUnitInput {
  @TypeGraphQL.Field((_type) => WeightRecordWhereUniqueInput, {
    nullable: false,
  })
  where!: WeightRecordWhereUniqueInput;

  @TypeGraphQL.Field((_type) => WeightRecordUpdateWithoutLivestockUnitInput, {
    nullable: false,
  })
  update!: WeightRecordUpdateWithoutLivestockUnitInput;

  @TypeGraphQL.Field((_type) => WeightRecordCreateWithoutLivestockUnitInput, {
    nullable: false,
  })
  create!: WeightRecordCreateWithoutLivestockUnitInput;
}

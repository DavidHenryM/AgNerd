import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordCreateWithoutLivestockUnitInput } from "../inputs/WeightRecordCreateWithoutLivestockUnitInput";
import { WeightRecordWhereUniqueInput } from "../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.InputType("WeightRecordCreateOrConnectWithoutLivestockUnitInput", {
  isAbstract: true,
})
export class WeightRecordCreateOrConnectWithoutLivestockUnitInput {
  @TypeGraphQL.Field((_type) => WeightRecordWhereUniqueInput, {
    nullable: false,
  })
  where!: WeightRecordWhereUniqueInput;

  @TypeGraphQL.Field((_type) => WeightRecordCreateWithoutLivestockUnitInput, {
    nullable: false,
  })
  create!: WeightRecordCreateWithoutLivestockUnitInput;
}

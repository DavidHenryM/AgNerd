import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordUpdateWithoutLivestockUnitInput } from "../inputs/WeightRecordUpdateWithoutLivestockUnitInput";
import { WeightRecordWhereUniqueInput } from "../inputs/WeightRecordWhereUniqueInput";

@TypeGraphQL.InputType("WeightRecordUpdateWithWhereUniqueWithoutLivestockUnitInput", {
  isAbstract: true
})
export class WeightRecordUpdateWithWhereUniqueWithoutLivestockUnitInput {
  @TypeGraphQL.Field(_type => WeightRecordWhereUniqueInput, {
    nullable: false
  })
  where!: WeightRecordWhereUniqueInput;

  @TypeGraphQL.Field(_type => WeightRecordUpdateWithoutLivestockUnitInput, {
    nullable: false
  })
  data!: WeightRecordUpdateWithoutLivestockUnitInput;
}

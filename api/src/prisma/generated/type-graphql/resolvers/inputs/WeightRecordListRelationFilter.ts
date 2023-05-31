import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordWhereInput } from "../inputs/WeightRecordWhereInput";

@TypeGraphQL.InputType("WeightRecordListRelationFilter", {
  isAbstract: true,
})
export class WeightRecordListRelationFilter {
  @TypeGraphQL.Field((_type) => WeightRecordWhereInput, {
    nullable: true,
  })
  every?: WeightRecordWhereInput | undefined;

  @TypeGraphQL.Field((_type) => WeightRecordWhereInput, {
    nullable: true,
  })
  some?: WeightRecordWhereInput | undefined;

  @TypeGraphQL.Field((_type) => WeightRecordWhereInput, {
    nullable: true,
  })
  none?: WeightRecordWhereInput | undefined;
}

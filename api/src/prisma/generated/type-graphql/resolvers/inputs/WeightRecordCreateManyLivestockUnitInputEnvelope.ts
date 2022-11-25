import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeightRecordCreateManyLivestockUnitInput } from "../inputs/WeightRecordCreateManyLivestockUnitInput";

@TypeGraphQL.InputType("WeightRecordCreateManyLivestockUnitInputEnvelope", {
  isAbstract: true
})
export class WeightRecordCreateManyLivestockUnitInputEnvelope {
  @TypeGraphQL.Field(_type => [WeightRecordCreateManyLivestockUnitInput], {
    nullable: false
  })
  data!: WeightRecordCreateManyLivestockUnitInput[];
}

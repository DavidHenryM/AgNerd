import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeighMethod } from "../../enums/WeighMethod";

@TypeGraphQL.ObjectType("WeightRecordMaxAggregate", {
  isAbstract: true
})
export class WeightRecordMaxAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  weight!: number | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dateMeasured!: Date | null;

  @TypeGraphQL.Field(_type => WeighMethod, {
    nullable: true
  })
  method!: "SCALES" | "IMAGE_ANALYSIS" | "VISUAL_ESTIMATE" | "MOB_AVERAGE" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  livestockUnitId!: string | null;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { LivestockUnit } from "../models/LivestockUnit";
import { WeighMethod } from "../enums/WeighMethod";

@TypeGraphQL.ObjectType("WeightRecord", {})
export class WeightRecord {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  weight!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  dateMeasured!: Date;

  @TypeGraphQL.Field((_type) => WeighMethod, {
    nullable: false,
  })
  method!: "SCALES" | "IMAGE_ANALYSIS" | "VISUAL_ESTIMATE" | "MOB_AVERAGE";

  livestockUnit?: LivestockUnit;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  livestockUnitId!: string;
}

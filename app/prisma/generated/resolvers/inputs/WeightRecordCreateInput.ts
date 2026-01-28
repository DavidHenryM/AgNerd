import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateNestedOneWithoutWeightsInput } from "../inputs/LivestockUnitCreateNestedOneWithoutWeightsInput";
import { WeighMethod } from "../../enums/WeighMethod";

@TypeGraphQL.InputType("WeightRecordCreateInput", {})
export class WeightRecordCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  weight!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  dateMeasured?: Date | undefined;

  @TypeGraphQL.Field((_type) => WeighMethod, {
    nullable: true,
  })
  method?:
    | "SCALES"
    | "IMAGE_ANALYSIS"
    | "VISUAL_ESTIMATE"
    | "MOB_AVERAGE"
    | undefined;

  @TypeGraphQL.Field(
    (_type) => LivestockUnitCreateNestedOneWithoutWeightsInput,
    {
      nullable: false,
    },
  )
  livestockUnit!: LivestockUnitCreateNestedOneWithoutWeightsInput;
}

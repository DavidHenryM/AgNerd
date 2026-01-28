import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeighMethod } from "../../enums/WeighMethod";

@TypeGraphQL.InputType("EnumWeighMethodFieldUpdateOperationsInput", {})
export class EnumWeighMethodFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => WeighMethod, {
    nullable: true,
  })
  set?:
    | "SCALES"
    | "IMAGE_ANALYSIS"
    | "VISUAL_ESTIMATE"
    | "MOB_AVERAGE"
    | undefined;
}

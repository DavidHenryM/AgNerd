import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WeighMethod } from "../../enums/WeighMethod";

@TypeGraphQL.InputType("NestedEnumWeighMethodFilter", {
  isAbstract: true
})
export class NestedEnumWeighMethodFilter {
  @TypeGraphQL.Field(_type => WeighMethod, {
    nullable: true
  })
  equals?: "SCALES" | "IMAGE_ANALYSIS" | "VISUAL_ESTIMATE" | "MOB_AVERAGE" | undefined;

  @TypeGraphQL.Field(_type => [WeighMethod], {
    nullable: true
  })
  in?: Array<"SCALES" | "IMAGE_ANALYSIS" | "VISUAL_ESTIMATE" | "MOB_AVERAGE"> | undefined;

  @TypeGraphQL.Field(_type => [WeighMethod], {
    nullable: true
  })
  notIn?: Array<"SCALES" | "IMAGE_ANALYSIS" | "VISUAL_ESTIMATE" | "MOB_AVERAGE"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumWeighMethodFilter, {
    nullable: true
  })
  not?: NestedEnumWeighMethodFilter | undefined;
}

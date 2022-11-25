import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumWeighMethodFilter } from "../inputs/NestedEnumWeighMethodFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { WeighMethod } from "../../enums/WeighMethod";

@TypeGraphQL.InputType("NestedEnumWeighMethodWithAggregatesFilter", {
  isAbstract: true
})
export class NestedEnumWeighMethodWithAggregatesFilter {
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

  @TypeGraphQL.Field(_type => NestedEnumWeighMethodWithAggregatesFilter, {
    nullable: true
  })
  not?: NestedEnumWeighMethodWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => NestedIntFilter, {
    nullable: true
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumWeighMethodFilter, {
    nullable: true
  })
  _min?: NestedEnumWeighMethodFilter | undefined;

  @TypeGraphQL.Field(_type => NestedEnumWeighMethodFilter, {
    nullable: true
  })
  _max?: NestedEnumWeighMethodFilter | undefined;
}

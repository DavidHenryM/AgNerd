import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumEbvCategoryFilter } from "../inputs/NestedEnumEbvCategoryFilter";
import { NestedEnumEbvCategoryWithAggregatesFilter } from "../inputs/NestedEnumEbvCategoryWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { EbvCategory } from "../../enums/EbvCategory";

@TypeGraphQL.InputType("EnumEbvCategoryWithAggregatesFilter", {})
export class EnumEbvCategoryWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => EbvCategory, {
    nullable: true,
  })
  equals?:
    | "CALVING_EASE"
    | "GROWTH"
    | "FERTILITY"
    | "TEMPERAMENT"
    | "CARCASE"
    | "FEED_EFFICIENCY"
    | "STRUCTURAL"
    | "SELECTION_INDEX"
    | undefined;

  @TypeGraphQL.Field((_type) => [EbvCategory], {
    nullable: true,
  })
  in?:
    | Array<
        | "CALVING_EASE"
        | "GROWTH"
        | "FERTILITY"
        | "TEMPERAMENT"
        | "CARCASE"
        | "FEED_EFFICIENCY"
        | "STRUCTURAL"
        | "SELECTION_INDEX"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => [EbvCategory], {
    nullable: true,
  })
  notIn?:
    | Array<
        | "CALVING_EASE"
        | "GROWTH"
        | "FERTILITY"
        | "TEMPERAMENT"
        | "CARCASE"
        | "FEED_EFFICIENCY"
        | "STRUCTURAL"
        | "SELECTION_INDEX"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumEbvCategoryWithAggregatesFilter, {
    nullable: true,
  })
  not?: NestedEnumEbvCategoryWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumEbvCategoryFilter, {
    nullable: true,
  })
  _min?: NestedEnumEbvCategoryFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumEbvCategoryFilter, {
    nullable: true,
  })
  _max?: NestedEnumEbvCategoryFilter | undefined;
}

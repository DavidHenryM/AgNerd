import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumEbvCategoryFilter } from "../inputs/NestedEnumEbvCategoryFilter";
import { EbvCategory } from "../../enums/EbvCategory";

@TypeGraphQL.InputType("EnumEbvCategoryFilter", {})
export class EnumEbvCategoryFilter {
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

  @TypeGraphQL.Field((_type) => NestedEnumEbvCategoryFilter, {
    nullable: true,
  })
  not?: NestedEnumEbvCategoryFilter | undefined;
}

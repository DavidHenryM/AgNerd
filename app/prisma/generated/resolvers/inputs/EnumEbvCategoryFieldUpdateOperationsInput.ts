import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EbvCategory } from "../../enums/EbvCategory";

@TypeGraphQL.InputType("EnumEbvCategoryFieldUpdateOperationsInput", {})
export class EnumEbvCategoryFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => EbvCategory, {
    nullable: true,
  })
  set?:
    | "CALVING_EASE"
    | "GROWTH"
    | "FERTILITY"
    | "TEMPERAMENT"
    | "CARCASE"
    | "FEED_EFFICIENCY"
    | "STRUCTURAL"
    | "SELECTION_INDEX"
    | undefined;
}

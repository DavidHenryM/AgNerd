import * as TypeGraphQL from "type-graphql";

export enum EbvCategory {
  CALVING_EASE = "CALVING_EASE",
  GROWTH = "GROWTH",
  FERTILITY = "FERTILITY",
  TEMPERAMENT = "TEMPERAMENT",
  CARCASE = "CARCASE",
  FEED_EFFICIENCY = "FEED_EFFICIENCY",
  STRUCTURAL = "STRUCTURAL",
  SELECTION_INDEX = "SELECTION_INDEX",
}
TypeGraphQL.registerEnumType(EbvCategory, {
  name: "EbvCategory",
  description: undefined,
});

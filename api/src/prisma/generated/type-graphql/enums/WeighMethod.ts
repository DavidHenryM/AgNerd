import * as TypeGraphQL from "type-graphql";

export enum WeighMethod {
  SCALES = "SCALES",
  IMAGE_ANALYSIS = "IMAGE_ANALYSIS",
  VISUAL_ESTIMATE = "VISUAL_ESTIMATE",
  MOB_AVERAGE = "MOB_AVERAGE",
}
TypeGraphQL.registerEnumType(WeighMethod, {
  name: "WeighMethod",
  description: undefined,
});

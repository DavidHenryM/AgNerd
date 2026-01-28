import * as TypeGraphQL from "type-graphql";

export enum FarmScalarFieldEnum {
  id = "id",
  name = "name",
  businessName = "businessName",
  lotSectionPlan = "lotSectionPlan",
  abn = "abn",
  acn = "acn",
  pic = "pic",
}
TypeGraphQL.registerEnumType(FarmScalarFieldEnum, {
  name: "FarmScalarFieldEnum",
  description: undefined,
});

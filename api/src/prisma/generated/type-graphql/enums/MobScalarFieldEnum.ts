import * as TypeGraphQL from "type-graphql";

export enum MobScalarFieldEnum {
  id = "id",
  name = "name",
  comment = "comment",
  grazeIds = "grazeIds"
}
TypeGraphQL.registerEnumType(MobScalarFieldEnum, {
  name: "MobScalarFieldEnum",
  description: undefined,
});

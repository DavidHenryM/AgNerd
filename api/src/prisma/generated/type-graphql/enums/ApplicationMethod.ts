import * as TypeGraphQL from "type-graphql";

export enum ApplicationMethod {
  ORAL = "ORAL",
  TRANSDERMAL = "TRANSDERMAL",
  SUB_CUT_INJECTION = "SUB_CUT_INJECTION",
  INTRAVENUS_INJECTION = "INTRAVENUS_INJECTION",
}
TypeGraphQL.registerEnumType(ApplicationMethod, {
  name: "ApplicationMethod",
  description: undefined,
});

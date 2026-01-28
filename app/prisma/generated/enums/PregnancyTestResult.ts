import * as TypeGraphQL from "type-graphql";

export enum PregnancyTestResult {
  PREGNANT = "PREGNANT",
  NOT_PREGNANT = "NOT_PREGNANT",
  INCONCLUSIVE = "INCONCLUSIVE",
}
TypeGraphQL.registerEnumType(PregnancyTestResult, {
  name: "PregnancyTestResult",
  description: undefined,
});

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LoraActivationMethod } from "../../enums/LoraActivationMethod";

@TypeGraphQL.InputType("NestedEnumLoraActivationMethodFilter", {
  isAbstract: true
})
export class NestedEnumLoraActivationMethodFilter {
  @TypeGraphQL.Field(_type => LoraActivationMethod, {
    nullable: true
  })
  equals?: "OTAA" | "ABP" | undefined;

  @TypeGraphQL.Field(_type => [LoraActivationMethod], {
    nullable: true
  })
  in?: Array<"OTAA" | "ABP"> | undefined;

  @TypeGraphQL.Field(_type => [LoraActivationMethod], {
    nullable: true
  })
  notIn?: Array<"OTAA" | "ABP"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumLoraActivationMethodFilter, {
    nullable: true
  })
  not?: NestedEnumLoraActivationMethodFilter | undefined;
}

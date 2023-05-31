import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumLoraActivationMethodFilter } from "../inputs/NestedEnumLoraActivationMethodFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { LoraActivationMethod } from "../../enums/LoraActivationMethod";

@TypeGraphQL.InputType("NestedEnumLoraActivationMethodWithAggregatesFilter", {
  isAbstract: true,
})
export class NestedEnumLoraActivationMethodWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => LoraActivationMethod, {
    nullable: true,
  })
  equals?: "OTAA" | "ABP" | undefined;

  @TypeGraphQL.Field((_type) => [LoraActivationMethod], {
    nullable: true,
  })
  in?: Array<"OTAA" | "ABP"> | undefined;

  @TypeGraphQL.Field((_type) => [LoraActivationMethod], {
    nullable: true,
  })
  notIn?: Array<"OTAA" | "ABP"> | undefined;

  @TypeGraphQL.Field(
    (_type) => NestedEnumLoraActivationMethodWithAggregatesFilter,
    {
      nullable: true,
    }
  )
  not?: NestedEnumLoraActivationMethodWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumLoraActivationMethodFilter, {
    nullable: true,
  })
  _min?: NestedEnumLoraActivationMethodFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumLoraActivationMethodFilter, {
    nullable: true,
  })
  _max?: NestedEnumLoraActivationMethodFilter | undefined;
}

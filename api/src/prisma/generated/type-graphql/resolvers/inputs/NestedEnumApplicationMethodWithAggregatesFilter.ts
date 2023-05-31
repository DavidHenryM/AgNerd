import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumApplicationMethodFilter } from "../inputs/NestedEnumApplicationMethodFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { ApplicationMethod } from "../../enums/ApplicationMethod";

@TypeGraphQL.InputType("NestedEnumApplicationMethodWithAggregatesFilter", {
  isAbstract: true,
})
export class NestedEnumApplicationMethodWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => ApplicationMethod, {
    nullable: true,
  })
  equals?:
    | "ORAL"
    | "TRANSDERMAL"
    | "SUB_CUT_INJECTION"
    | "INTRAVENUS_INJECTION"
    | undefined;

  @TypeGraphQL.Field((_type) => [ApplicationMethod], {
    nullable: true,
  })
  in?:
    | Array<
        "ORAL" | "TRANSDERMAL" | "SUB_CUT_INJECTION" | "INTRAVENUS_INJECTION"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => [ApplicationMethod], {
    nullable: true,
  })
  notIn?:
    | Array<
        "ORAL" | "TRANSDERMAL" | "SUB_CUT_INJECTION" | "INTRAVENUS_INJECTION"
      >
    | undefined;

  @TypeGraphQL.Field(
    (_type) => NestedEnumApplicationMethodWithAggregatesFilter,
    {
      nullable: true,
    }
  )
  not?: NestedEnumApplicationMethodWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumApplicationMethodFilter, {
    nullable: true,
  })
  _min?: NestedEnumApplicationMethodFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumApplicationMethodFilter, {
    nullable: true,
  })
  _max?: NestedEnumApplicationMethodFilter | undefined;
}

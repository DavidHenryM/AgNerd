import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumStockClassFilter } from "../inputs/NestedEnumStockClassFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { StockClass } from "../../enums/StockClass";

@TypeGraphQL.InputType("NestedEnumStockClassWithAggregatesFilter", {})
export class NestedEnumStockClassWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => StockClass, {
    nullable: true,
  })
  equals?:
    | "CATTLE"
    | "SHEEP"
    | "GOAT"
    | "CAMEL"
    | "ALPACA"
    | "LLAMA"
    | "CHICKEN"
    | "DUCK"
    | "TURKEY"
    | undefined;

  @TypeGraphQL.Field((_type) => [StockClass], {
    nullable: true,
  })
  in?:
    | Array<
        | "CATTLE"
        | "SHEEP"
        | "GOAT"
        | "CAMEL"
        | "ALPACA"
        | "LLAMA"
        | "CHICKEN"
        | "DUCK"
        | "TURKEY"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => [StockClass], {
    nullable: true,
  })
  notIn?:
    | Array<
        | "CATTLE"
        | "SHEEP"
        | "GOAT"
        | "CAMEL"
        | "ALPACA"
        | "LLAMA"
        | "CHICKEN"
        | "DUCK"
        | "TURKEY"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumStockClassWithAggregatesFilter, {
    nullable: true,
  })
  not?: NestedEnumStockClassWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntFilter, {
    nullable: true,
  })
  _count?: NestedIntFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumStockClassFilter, {
    nullable: true,
  })
  _min?: NestedEnumStockClassFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumStockClassFilter, {
    nullable: true,
  })
  _max?: NestedEnumStockClassFilter | undefined;
}

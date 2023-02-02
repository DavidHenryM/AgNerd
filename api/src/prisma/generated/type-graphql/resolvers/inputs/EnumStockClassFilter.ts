import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumStockClassFilter } from "../inputs/NestedEnumStockClassFilter";
import { StockClass } from "../../enums/StockClass";

@TypeGraphQL.InputType("EnumStockClassFilter", {
  isAbstract: true
})
export class EnumStockClassFilter {
  @TypeGraphQL.Field(_type => StockClass, {
    nullable: true
  })
  equals?: "CATTLE" | "SHEEP" | "GOAT" | "CAMEL" | "ALPACA" | "LLAMA" | "CHICKEN" | "DUCK" | "TURKEY" | undefined;

  @TypeGraphQL.Field(_type => [StockClass], {
    nullable: true
  })
  in?: Array<"CATTLE" | "SHEEP" | "GOAT" | "CAMEL" | "ALPACA" | "LLAMA" | "CHICKEN" | "DUCK" | "TURKEY"> | undefined;

  @TypeGraphQL.Field(_type => [StockClass], {
    nullable: true
  })
  notIn?: Array<"CATTLE" | "SHEEP" | "GOAT" | "CAMEL" | "ALPACA" | "LLAMA" | "CHICKEN" | "DUCK" | "TURKEY"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumStockClassFilter, {
    nullable: true
  })
  not?: NestedEnumStockClassFilter | undefined;
}

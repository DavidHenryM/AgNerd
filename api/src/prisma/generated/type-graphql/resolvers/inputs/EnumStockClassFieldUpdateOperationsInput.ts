import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StockClass } from "../../enums/StockClass";

@TypeGraphQL.InputType("EnumStockClassFieldUpdateOperationsInput", {
  isAbstract: true
})
export class EnumStockClassFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => StockClass, {
    nullable: true
  })
  set?: "CATTLE" | "SHEEP" | "GOAT" | "CAMEL" | "ALPACA" | "CHICKEN" | "DUCK" | "TURKEY" | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCreateNestedOneWithoutBreedInput } from "../inputs/LivestockUnitCreateNestedOneWithoutBreedInput";
import { StockClass } from "../../enums/StockClass";

@TypeGraphQL.InputType("BreedCreateInput", {})
export class BreedCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => StockClass, {
    nullable: false,
  })
  class!:
    | "CATTLE"
    | "SHEEP"
    | "GOAT"
    | "CAMEL"
    | "ALPACA"
    | "LLAMA"
    | "CHICKEN"
    | "DUCK"
    | "TURKEY";

  @TypeGraphQL.Field((_type) => LivestockUnitCreateNestedOneWithoutBreedInput, {
    nullable: true,
  })
  members?: LivestockUnitCreateNestedOneWithoutBreedInput | undefined;
}

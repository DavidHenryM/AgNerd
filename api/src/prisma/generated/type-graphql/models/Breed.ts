import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { LivestockUnit } from "../models/LivestockUnit";
import { StockClass } from "../enums/StockClass";

@TypeGraphQL.ObjectType("Breed", {
  isAbstract: true
})
export class Breed {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => StockClass, {
    nullable: false
  })
  class!: "CATTLE" | "SHEEP" | "GOAT" | "CAMEL" | "ALPACA" | "CHICKEN" | "DUCK" | "TURKEY";

  members?: LivestockUnit | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  memberId?: string | null;
}

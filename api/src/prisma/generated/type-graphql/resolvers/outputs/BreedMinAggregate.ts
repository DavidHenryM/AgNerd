import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StockClass } from "../../enums/StockClass";

@TypeGraphQL.ObjectType("BreedMinAggregate", {
  isAbstract: true
})
export class BreedMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name!: string | null;

  @TypeGraphQL.Field(_type => StockClass, {
    nullable: true
  })
  class!: "CATTLE" | "SHEEP" | "GOAT" | "CAMEL" | "ALPACA" | "CHICKEN" | "DUCK" | "TURKEY" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  memberId!: string | null;
}

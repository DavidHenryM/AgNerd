import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BreedCountAggregate } from "../outputs/BreedCountAggregate";
import { BreedMaxAggregate } from "../outputs/BreedMaxAggregate";
import { BreedMinAggregate } from "../outputs/BreedMinAggregate";
import { StockClass } from "../../enums/StockClass";

@TypeGraphQL.ObjectType("BreedGroupBy", {
  isAbstract: true
})
export class BreedGroupBy {
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

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  memberId!: string | null;

  @TypeGraphQL.Field(_type => BreedCountAggregate, {
    nullable: true
  })
  _count!: BreedCountAggregate | null;

  @TypeGraphQL.Field(_type => BreedMinAggregate, {
    nullable: true
  })
  _min!: BreedMinAggregate | null;

  @TypeGraphQL.Field(_type => BreedMaxAggregate, {
    nullable: true
  })
  _max!: BreedMaxAggregate | null;
}

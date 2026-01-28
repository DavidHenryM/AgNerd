import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCountAggregate } from "../outputs/FarmCountAggregate";
import { FarmMaxAggregate } from "../outputs/FarmMaxAggregate";
import { FarmMinAggregate } from "../outputs/FarmMinAggregate";

@TypeGraphQL.ObjectType("FarmGroupBy", {})
export class FarmGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  businessName!: string | null;

  @TypeGraphQL.Field((_type) => [String], {
    nullable: true,
  })
  lotSectionPlan!: string[] | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  abn!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  acn!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  pic!: string | null;

  @TypeGraphQL.Field((_type) => FarmCountAggregate, {
    nullable: true,
  })
  _count!: FarmCountAggregate | null;

  @TypeGraphQL.Field((_type) => FarmMinAggregate, {
    nullable: true,
  })
  _min!: FarmMinAggregate | null;

  @TypeGraphQL.Field((_type) => FarmMaxAggregate, {
    nullable: true,
  })
  _max!: FarmMaxAggregate | null;
}

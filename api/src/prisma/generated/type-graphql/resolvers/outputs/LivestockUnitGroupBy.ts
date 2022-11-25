import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LivestockUnitCountAggregate } from "../outputs/LivestockUnitCountAggregate";
import { LivestockUnitMaxAggregate } from "../outputs/LivestockUnitMaxAggregate";
import { LivestockUnitMinAggregate } from "../outputs/LivestockUnitMinAggregate";
import { Sex } from "../../enums/Sex";

@TypeGraphQL.ObjectType("LivestockUnitGroupBy", {
  isAbstract: true
})
export class LivestockUnitGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  nlisid!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  comment!: string | null;

  @TypeGraphQL.Field(_type => Sex, {
    nullable: false
  })
  sex!: "MALE" | "FEMALE";

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  birthdate!: Date;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  desexed!: boolean;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  parentId!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  livestockUnitId!: string;

  @TypeGraphQL.Field(_type => LivestockUnitCountAggregate, {
    nullable: true
  })
  _count!: LivestockUnitCountAggregate | null;

  @TypeGraphQL.Field(_type => LivestockUnitMinAggregate, {
    nullable: true
  })
  _min!: LivestockUnitMinAggregate | null;

  @TypeGraphQL.Field(_type => LivestockUnitMaxAggregate, {
    nullable: true
  })
  _max!: LivestockUnitMaxAggregate | null;
}

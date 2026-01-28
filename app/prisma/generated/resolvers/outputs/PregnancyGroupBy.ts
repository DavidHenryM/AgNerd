import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PregnancyCountAggregate } from "../outputs/PregnancyCountAggregate";
import { PregnancyMaxAggregate } from "../outputs/PregnancyMaxAggregate";
import { PregnancyMinAggregate } from "../outputs/PregnancyMinAggregate";

@TypeGraphQL.ObjectType("PregnancyGroupBy", {})
export class PregnancyGroupBy {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  earliestPossibleConception!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  latestPossibleConception!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  conception!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  dueDate!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  earliestPossibleBirth!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  latestPossibleBirth!: Date | null;

  @TypeGraphQL.Field((_type) => [String], {
    nullable: true,
  })
  parentId!: string[] | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  pregnancySireId!: string;

  @TypeGraphQL.Field((_type) => PregnancyCountAggregate, {
    nullable: true,
  })
  _count!: PregnancyCountAggregate | null;

  @TypeGraphQL.Field((_type) => PregnancyMinAggregate, {
    nullable: true,
  })
  _min!: PregnancyMinAggregate | null;

  @TypeGraphQL.Field((_type) => PregnancyMaxAggregate, {
    nullable: true,
  })
  _max!: PregnancyMaxAggregate | null;
}

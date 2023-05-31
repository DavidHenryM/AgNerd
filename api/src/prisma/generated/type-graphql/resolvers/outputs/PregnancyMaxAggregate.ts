import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("PregnancyMaxAggregate", {
  isAbstract: true,
})
export class PregnancyMaxAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

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

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  pregnancySireId!: string | null;
}

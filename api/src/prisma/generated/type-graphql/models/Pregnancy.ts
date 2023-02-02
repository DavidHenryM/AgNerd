import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { LivestockUnit } from "../models/LivestockUnit";
import { PregnancyTest } from "../models/PregnancyTest";
import { PregnancyCount } from "../resolvers/outputs/PregnancyCount";

@TypeGraphQL.ObjectType("Pregnancy", {
  isAbstract: true
})
export class Pregnancy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  earliestPossibleConception?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  latestPossibleConception?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  conception?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dueDate?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  earliestPossibleBirth?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  latestPossibleBirth?: Date | null;

  @TypeGraphQL.Field(_type => [String], {
    nullable: false
  })
  parentId!: string[];

  parents?: LivestockUnit[];

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  pregnancySireId!: string;

  pregnancyTest?: PregnancyTest[];

  @TypeGraphQL.Field(_type => PregnancyCount, {
    nullable: true
  })
  _count?: PregnancyCount | null;
}

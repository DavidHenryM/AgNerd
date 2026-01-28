import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Graze } from "../models/Graze";
import { LivestockUnit } from "../models/LivestockUnit";
import { MobCount } from "../resolvers/outputs/MobCount";

@TypeGraphQL.ObjectType("Mob", {})
export class Mob {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | null;

  members?: LivestockUnit[];

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  comment?: string | null;

  @TypeGraphQL.Field((_type) => [String], {
    nullable: false,
  })
  grazeIds!: string[];

  graze?: Graze[];

  @TypeGraphQL.Field((_type) => MobCount, {
    nullable: true,
  })
  _count?: MobCount | null;
}

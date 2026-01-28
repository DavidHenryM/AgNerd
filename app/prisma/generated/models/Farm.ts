import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { User } from "../models/User";
import { FarmCount } from "../resolvers/outputs/FarmCount";

@TypeGraphQL.ObjectType("Farm", {})
export class Farm {
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
  businessName?: string | null;

  @TypeGraphQL.Field((_type) => [String], {
    nullable: false,
  })
  lotSectionPlan!: string[];

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  abn?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  acn?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  pic?: string | null;

  users?: User[];

  @TypeGraphQL.Field((_type) => FarmCount, {
    nullable: true,
  })
  _count?: FarmCount | null;
}

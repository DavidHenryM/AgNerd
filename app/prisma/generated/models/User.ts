import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Account } from "../models/Account";
import { Farm } from "../models/Farm";
import { Session } from "../models/Session";
import { UserCount } from "../resolvers/outputs/UserCount";

@TypeGraphQL.ObjectType("User", {})
export class User {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: false,
  })
  emailVerified!: boolean;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  image?: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  updatedAt!: Date;

  sessions?: Session[];

  accounts?: Account[];

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  firstName?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  preferredName?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  lastName?: string | null;

  farm?: Farm | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  farmId?: string | null;

  @TypeGraphQL.Field((_type) => UserCount, {
    nullable: true,
  })
  _count?: UserCount | null;
}

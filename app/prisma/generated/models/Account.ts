import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { User } from "../models/User";

@TypeGraphQL.ObjectType("Account", {})
export class Account {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  accountId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  providerId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  userId!: string;

  user?: User;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  accessToken?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  refreshToken?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  idToken?: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  accessTokenExpiresAt?: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  refreshTokenExpiresAt?: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  scope?: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  password?: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  updatedAt!: Date;
}

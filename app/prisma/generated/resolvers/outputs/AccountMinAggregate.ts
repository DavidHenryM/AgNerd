import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("AccountMinAggregate", {})
export class AccountMinAggregate {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  accountId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  providerId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  userId!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  accessToken!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  refreshToken!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  idToken!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  accessTokenExpiresAt!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  refreshTokenExpiresAt!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  scope!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  password!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  createdAt!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  updatedAt!: Date | null;
}

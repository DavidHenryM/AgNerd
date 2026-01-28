import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateNestedOneWithoutAccountsInput } from "../inputs/UserCreateNestedOneWithoutAccountsInput";

@TypeGraphQL.InputType("AccountCreateInput", {})
export class AccountCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  accountId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  providerId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  accessToken?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  refreshToken?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  idToken?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  accessTokenExpiresAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  refreshTokenExpiresAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  scope?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  password?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => UserCreateNestedOneWithoutAccountsInput, {
    nullable: false,
  })
  user!: UserCreateNestedOneWithoutAccountsInput;
}

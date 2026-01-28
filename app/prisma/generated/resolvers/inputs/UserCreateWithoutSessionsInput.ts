import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AccountCreateNestedManyWithoutUserInput } from "../inputs/AccountCreateNestedManyWithoutUserInput";
import { FarmCreateNestedOneWithoutUsersInput } from "../inputs/FarmCreateNestedOneWithoutUsersInput";

@TypeGraphQL.InputType("UserCreateWithoutSessionsInput", {})
export class UserCreateWithoutSessionsInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  emailVerified?: boolean | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  image?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  firstName?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  preferredName?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  lastName?: string | undefined;

  @TypeGraphQL.Field((_type) => AccountCreateNestedManyWithoutUserInput, {
    nullable: true,
  })
  accounts?: AccountCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field((_type) => FarmCreateNestedOneWithoutUsersInput, {
    nullable: true,
  })
  farm?: FarmCreateNestedOneWithoutUsersInput | undefined;
}

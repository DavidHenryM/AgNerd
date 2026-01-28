import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutAccountsInput } from "../inputs/UserCreateWithoutAccountsInput";
import { UserUpdateWithoutAccountsInput } from "../inputs/UserUpdateWithoutAccountsInput";
import { UserWhereInput } from "../inputs/UserWhereInput";

@TypeGraphQL.InputType("UserUpsertWithoutAccountsInput", {})
export class UserUpsertWithoutAccountsInput {
  @TypeGraphQL.Field((_type) => UserUpdateWithoutAccountsInput, {
    nullable: false,
  })
  update!: UserUpdateWithoutAccountsInput;

  @TypeGraphQL.Field((_type) => UserCreateWithoutAccountsInput, {
    nullable: false,
  })
  create!: UserCreateWithoutAccountsInput;

  @TypeGraphQL.Field((_type) => UserWhereInput, {
    nullable: true,
  })
  where?: UserWhereInput | undefined;
}

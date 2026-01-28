import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutSessionsInput } from "../inputs/UserCreateWithoutSessionsInput";
import { UserUpdateWithoutSessionsInput } from "../inputs/UserUpdateWithoutSessionsInput";
import { UserWhereInput } from "../inputs/UserWhereInput";

@TypeGraphQL.InputType("UserUpsertWithoutSessionsInput", {})
export class UserUpsertWithoutSessionsInput {
  @TypeGraphQL.Field((_type) => UserUpdateWithoutSessionsInput, {
    nullable: false,
  })
  update!: UserUpdateWithoutSessionsInput;

  @TypeGraphQL.Field((_type) => UserCreateWithoutSessionsInput, {
    nullable: false,
  })
  create!: UserCreateWithoutSessionsInput;

  @TypeGraphQL.Field((_type) => UserWhereInput, {
    nullable: true,
  })
  where?: UserWhereInput | undefined;
}

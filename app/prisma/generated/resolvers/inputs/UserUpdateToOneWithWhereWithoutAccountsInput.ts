import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserUpdateWithoutAccountsInput } from "../inputs/UserUpdateWithoutAccountsInput";
import { UserWhereInput } from "../inputs/UserWhereInput";

@TypeGraphQL.InputType("UserUpdateToOneWithWhereWithoutAccountsInput", {})
export class UserUpdateToOneWithWhereWithoutAccountsInput {
  @TypeGraphQL.Field((_type) => UserWhereInput, {
    nullable: true,
  })
  where?: UserWhereInput | undefined;

  @TypeGraphQL.Field((_type) => UserUpdateWithoutAccountsInput, {
    nullable: false,
  })
  data!: UserUpdateWithoutAccountsInput;
}

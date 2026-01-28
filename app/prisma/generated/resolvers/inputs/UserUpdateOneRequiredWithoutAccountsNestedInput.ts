import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutAccountsInput } from "../inputs/UserCreateOrConnectWithoutAccountsInput";
import { UserCreateWithoutAccountsInput } from "../inputs/UserCreateWithoutAccountsInput";
import { UserUpdateToOneWithWhereWithoutAccountsInput } from "../inputs/UserUpdateToOneWithWhereWithoutAccountsInput";
import { UserUpsertWithoutAccountsInput } from "../inputs/UserUpsertWithoutAccountsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateOneRequiredWithoutAccountsNestedInput", {})
export class UserUpdateOneRequiredWithoutAccountsNestedInput {
  @TypeGraphQL.Field((_type) => UserCreateWithoutAccountsInput, {
    nullable: true,
  })
  create?: UserCreateWithoutAccountsInput | undefined;

  @TypeGraphQL.Field((_type) => UserCreateOrConnectWithoutAccountsInput, {
    nullable: true,
  })
  connectOrCreate?: UserCreateOrConnectWithoutAccountsInput | undefined;

  @TypeGraphQL.Field((_type) => UserUpsertWithoutAccountsInput, {
    nullable: true,
  })
  upsert?: UserUpsertWithoutAccountsInput | undefined;

  @TypeGraphQL.Field((_type) => UserWhereUniqueInput, {
    nullable: true,
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => UserUpdateToOneWithWhereWithoutAccountsInput, {
    nullable: true,
  })
  update?: UserUpdateToOneWithWhereWithoutAccountsInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutFarmInput } from "../inputs/UserCreateWithoutFarmInput";
import { UserUpdateWithoutFarmInput } from "../inputs/UserUpdateWithoutFarmInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpsertWithWhereUniqueWithoutFarmInput", {})
export class UserUpsertWithWhereUniqueWithoutFarmInput {
  @TypeGraphQL.Field((_type) => UserWhereUniqueInput, {
    nullable: false,
  })
  where!: UserWhereUniqueInput;

  @TypeGraphQL.Field((_type) => UserUpdateWithoutFarmInput, {
    nullable: false,
  })
  update!: UserUpdateWithoutFarmInput;

  @TypeGraphQL.Field((_type) => UserCreateWithoutFarmInput, {
    nullable: false,
  })
  create!: UserCreateWithoutFarmInput;
}

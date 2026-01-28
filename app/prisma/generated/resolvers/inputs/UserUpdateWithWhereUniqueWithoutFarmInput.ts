import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserUpdateWithoutFarmInput } from "../inputs/UserUpdateWithoutFarmInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateWithWhereUniqueWithoutFarmInput", {})
export class UserUpdateWithWhereUniqueWithoutFarmInput {
  @TypeGraphQL.Field((_type) => UserWhereUniqueInput, {
    nullable: false,
  })
  where!: UserWhereUniqueInput;

  @TypeGraphQL.Field((_type) => UserUpdateWithoutFarmInput, {
    nullable: false,
  })
  data!: UserUpdateWithoutFarmInput;
}

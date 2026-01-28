import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserUpdateWithoutSessionsInput } from "../inputs/UserUpdateWithoutSessionsInput";
import { UserWhereInput } from "../inputs/UserWhereInput";

@TypeGraphQL.InputType("UserUpdateToOneWithWhereWithoutSessionsInput", {})
export class UserUpdateToOneWithWhereWithoutSessionsInput {
  @TypeGraphQL.Field((_type) => UserWhereInput, {
    nullable: true,
  })
  where?: UserWhereInput | undefined;

  @TypeGraphQL.Field((_type) => UserUpdateWithoutSessionsInput, {
    nullable: false,
  })
  data!: UserUpdateWithoutSessionsInput;
}

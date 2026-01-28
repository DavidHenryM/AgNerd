import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCreateOrConnectWithoutUsersInput } from "../inputs/FarmCreateOrConnectWithoutUsersInput";
import { FarmCreateWithoutUsersInput } from "../inputs/FarmCreateWithoutUsersInput";
import { FarmWhereUniqueInput } from "../inputs/FarmWhereUniqueInput";

@TypeGraphQL.InputType("FarmCreateNestedOneWithoutUsersInput", {})
export class FarmCreateNestedOneWithoutUsersInput {
  @TypeGraphQL.Field((_type) => FarmCreateWithoutUsersInput, {
    nullable: true,
  })
  create?: FarmCreateWithoutUsersInput | undefined;

  @TypeGraphQL.Field((_type) => FarmCreateOrConnectWithoutUsersInput, {
    nullable: true,
  })
  connectOrCreate?: FarmCreateOrConnectWithoutUsersInput | undefined;

  @TypeGraphQL.Field((_type) => FarmWhereUniqueInput, {
    nullable: true,
  })
  connect?: FarmWhereUniqueInput | undefined;
}

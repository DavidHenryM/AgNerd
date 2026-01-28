import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCreateWithoutUsersInput } from "../inputs/FarmCreateWithoutUsersInput";
import { FarmWhereUniqueInput } from "../inputs/FarmWhereUniqueInput";

@TypeGraphQL.InputType("FarmCreateOrConnectWithoutUsersInput", {})
export class FarmCreateOrConnectWithoutUsersInput {
  @TypeGraphQL.Field((_type) => FarmWhereUniqueInput, {
    nullable: false,
  })
  where!: FarmWhereUniqueInput;

  @TypeGraphQL.Field((_type) => FarmCreateWithoutUsersInput, {
    nullable: false,
  })
  create!: FarmCreateWithoutUsersInput;
}

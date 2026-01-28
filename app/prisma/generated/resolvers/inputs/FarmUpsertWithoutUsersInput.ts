import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCreateWithoutUsersInput } from "../inputs/FarmCreateWithoutUsersInput";
import { FarmUpdateWithoutUsersInput } from "../inputs/FarmUpdateWithoutUsersInput";
import { FarmWhereInput } from "../inputs/FarmWhereInput";

@TypeGraphQL.InputType("FarmUpsertWithoutUsersInput", {})
export class FarmUpsertWithoutUsersInput {
  @TypeGraphQL.Field((_type) => FarmUpdateWithoutUsersInput, {
    nullable: false,
  })
  update!: FarmUpdateWithoutUsersInput;

  @TypeGraphQL.Field((_type) => FarmCreateWithoutUsersInput, {
    nullable: false,
  })
  create!: FarmCreateWithoutUsersInput;

  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  where?: FarmWhereInput | undefined;
}

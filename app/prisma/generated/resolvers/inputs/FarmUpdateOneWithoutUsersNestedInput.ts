import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { FarmCreateOrConnectWithoutUsersInput } from "../inputs/FarmCreateOrConnectWithoutUsersInput";
import { FarmCreateWithoutUsersInput } from "../inputs/FarmCreateWithoutUsersInput";
import { FarmUpdateToOneWithWhereWithoutUsersInput } from "../inputs/FarmUpdateToOneWithWhereWithoutUsersInput";
import { FarmUpsertWithoutUsersInput } from "../inputs/FarmUpsertWithoutUsersInput";
import { FarmWhereInput } from "../inputs/FarmWhereInput";
import { FarmWhereUniqueInput } from "../inputs/FarmWhereUniqueInput";

@TypeGraphQL.InputType("FarmUpdateOneWithoutUsersNestedInput", {})
export class FarmUpdateOneWithoutUsersNestedInput {
  @TypeGraphQL.Field((_type) => FarmCreateWithoutUsersInput, {
    nullable: true,
  })
  create?: FarmCreateWithoutUsersInput | undefined;

  @TypeGraphQL.Field((_type) => FarmCreateOrConnectWithoutUsersInput, {
    nullable: true,
  })
  connectOrCreate?: FarmCreateOrConnectWithoutUsersInput | undefined;

  @TypeGraphQL.Field((_type) => FarmUpsertWithoutUsersInput, {
    nullable: true,
  })
  upsert?: FarmUpsertWithoutUsersInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => FarmWhereInput, {
    nullable: true,
  })
  delete?: FarmWhereInput | undefined;

  @TypeGraphQL.Field((_type) => FarmWhereUniqueInput, {
    nullable: true,
  })
  connect?: FarmWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => FarmUpdateToOneWithWhereWithoutUsersInput, {
    nullable: true,
  })
  update?: FarmUpdateToOneWithWhereWithoutUsersInput | undefined;
}

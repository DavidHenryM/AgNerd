import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateManyFarmInputEnvelope } from "../inputs/UserCreateManyFarmInputEnvelope";
import { UserCreateOrConnectWithoutFarmInput } from "../inputs/UserCreateOrConnectWithoutFarmInput";
import { UserCreateWithoutFarmInput } from "../inputs/UserCreateWithoutFarmInput";
import { UserScalarWhereInput } from "../inputs/UserScalarWhereInput";
import { UserUpdateManyWithWhereWithoutFarmInput } from "../inputs/UserUpdateManyWithWhereWithoutFarmInput";
import { UserUpdateWithWhereUniqueWithoutFarmInput } from "../inputs/UserUpdateWithWhereUniqueWithoutFarmInput";
import { UserUpsertWithWhereUniqueWithoutFarmInput } from "../inputs/UserUpsertWithWhereUniqueWithoutFarmInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateManyWithoutFarmNestedInput", {})
export class UserUpdateManyWithoutFarmNestedInput {
  @TypeGraphQL.Field((_type) => [UserCreateWithoutFarmInput], {
    nullable: true,
  })
  create?: UserCreateWithoutFarmInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserCreateOrConnectWithoutFarmInput], {
    nullable: true,
  })
  connectOrCreate?: UserCreateOrConnectWithoutFarmInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserUpsertWithWhereUniqueWithoutFarmInput], {
    nullable: true,
  })
  upsert?: UserUpsertWithWhereUniqueWithoutFarmInput[] | undefined;

  @TypeGraphQL.Field((_type) => UserCreateManyFarmInputEnvelope, {
    nullable: true,
  })
  createMany?: UserCreateManyFarmInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [UserWhereUniqueInput], {
    nullable: true,
  })
  set?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserWhereUniqueInput], {
    nullable: true,
  })
  disconnect?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserWhereUniqueInput], {
    nullable: true,
  })
  delete?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserWhereUniqueInput], {
    nullable: true,
  })
  connect?: UserWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserUpdateWithWhereUniqueWithoutFarmInput], {
    nullable: true,
  })
  update?: UserUpdateWithWhereUniqueWithoutFarmInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserUpdateManyWithWhereWithoutFarmInput], {
    nullable: true,
  })
  updateMany?: UserUpdateManyWithWhereWithoutFarmInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserScalarWhereInput], {
    nullable: true,
  })
  deleteMany?: UserScalarWhereInput[] | undefined;
}

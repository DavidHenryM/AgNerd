import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateManyFarmInputEnvelope } from "../inputs/UserCreateManyFarmInputEnvelope";
import { UserCreateOrConnectWithoutFarmInput } from "../inputs/UserCreateOrConnectWithoutFarmInput";
import { UserCreateWithoutFarmInput } from "../inputs/UserCreateWithoutFarmInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserCreateNestedManyWithoutFarmInput", {})
export class UserCreateNestedManyWithoutFarmInput {
  @TypeGraphQL.Field((_type) => [UserCreateWithoutFarmInput], {
    nullable: true,
  })
  create?: UserCreateWithoutFarmInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UserCreateOrConnectWithoutFarmInput], {
    nullable: true,
  })
  connectOrCreate?: UserCreateOrConnectWithoutFarmInput[] | undefined;

  @TypeGraphQL.Field((_type) => UserCreateManyFarmInputEnvelope, {
    nullable: true,
  })
  createMany?: UserCreateManyFarmInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [UserWhereUniqueInput], {
    nullable: true,
  })
  connect?: UserWhereUniqueInput[] | undefined;
}

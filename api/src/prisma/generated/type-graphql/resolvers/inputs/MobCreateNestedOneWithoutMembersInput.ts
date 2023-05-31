import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateOrConnectWithoutMembersInput } from "../inputs/MobCreateOrConnectWithoutMembersInput";
import { MobCreateWithoutMembersInput } from "../inputs/MobCreateWithoutMembersInput";
import { MobWhereUniqueInput } from "../inputs/MobWhereUniqueInput";

@TypeGraphQL.InputType("MobCreateNestedOneWithoutMembersInput", {
  isAbstract: true,
})
export class MobCreateNestedOneWithoutMembersInput {
  @TypeGraphQL.Field((_type) => MobCreateWithoutMembersInput, {
    nullable: true,
  })
  create?: MobCreateWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => MobCreateOrConnectWithoutMembersInput, {
    nullable: true,
  })
  connectOrCreate?: MobCreateOrConnectWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => MobWhereUniqueInput, {
    nullable: true,
  })
  connect?: MobWhereUniqueInput | undefined;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateOrConnectWithoutMembersInput } from "../inputs/MobCreateOrConnectWithoutMembersInput";
import { MobCreateWithoutMembersInput } from "../inputs/MobCreateWithoutMembersInput";
import { MobUpdateToOneWithWhereWithoutMembersInput } from "../inputs/MobUpdateToOneWithWhereWithoutMembersInput";
import { MobUpsertWithoutMembersInput } from "../inputs/MobUpsertWithoutMembersInput";
import { MobWhereInput } from "../inputs/MobWhereInput";
import { MobWhereUniqueInput } from "../inputs/MobWhereUniqueInput";

@TypeGraphQL.InputType("MobUpdateOneWithoutMembersNestedInput", {})
export class MobUpdateOneWithoutMembersNestedInput {
  @TypeGraphQL.Field((_type) => MobCreateWithoutMembersInput, {
    nullable: true,
  })
  create?: MobCreateWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => MobCreateOrConnectWithoutMembersInput, {
    nullable: true,
  })
  connectOrCreate?: MobCreateOrConnectWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => MobUpsertWithoutMembersInput, {
    nullable: true,
  })
  upsert?: MobUpsertWithoutMembersInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  delete?: MobWhereInput | undefined;

  @TypeGraphQL.Field((_type) => MobWhereUniqueInput, {
    nullable: true,
  })
  connect?: MobWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => MobUpdateToOneWithWhereWithoutMembersInput, {
    nullable: true,
  })
  update?: MobUpdateToOneWithWhereWithoutMembersInput | undefined;
}

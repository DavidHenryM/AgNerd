import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateOrConnectWithoutMembersInput } from "../inputs/MobCreateOrConnectWithoutMembersInput";
import { MobCreateWithoutMembersInput } from "../inputs/MobCreateWithoutMembersInput";
import { MobUpdateWithoutMembersInput } from "../inputs/MobUpdateWithoutMembersInput";
import { MobUpsertWithoutMembersInput } from "../inputs/MobUpsertWithoutMembersInput";
import { MobWhereUniqueInput } from "../inputs/MobWhereUniqueInput";

@TypeGraphQL.InputType("MobUpdateOneRequiredWithoutMembersNestedInput", {
  isAbstract: true,
})
export class MobUpdateOneRequiredWithoutMembersNestedInput {
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

  @TypeGraphQL.Field((_type) => MobWhereUniqueInput, {
    nullable: true,
  })
  connect?: MobWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => MobUpdateWithoutMembersInput, {
    nullable: true,
  })
  update?: MobUpdateWithoutMembersInput | undefined;
}

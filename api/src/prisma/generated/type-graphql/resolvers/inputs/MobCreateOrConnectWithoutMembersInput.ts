import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateWithoutMembersInput } from "../inputs/MobCreateWithoutMembersInput";
import { MobWhereUniqueInput } from "../inputs/MobWhereUniqueInput";

@TypeGraphQL.InputType("MobCreateOrConnectWithoutMembersInput", {
  isAbstract: true
})
export class MobCreateOrConnectWithoutMembersInput {
  @TypeGraphQL.Field(_type => MobWhereUniqueInput, {
    nullable: false
  })
  where!: MobWhereUniqueInput;

  @TypeGraphQL.Field(_type => MobCreateWithoutMembersInput, {
    nullable: false
  })
  create!: MobCreateWithoutMembersInput;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateWithoutMembersInput } from "../inputs/MobCreateWithoutMembersInput";
import { MobUpdateWithoutMembersInput } from "../inputs/MobUpdateWithoutMembersInput";
import { MobWhereInput } from "../inputs/MobWhereInput";

@TypeGraphQL.InputType("MobUpsertWithoutMembersInput", {})
export class MobUpsertWithoutMembersInput {
  @TypeGraphQL.Field((_type) => MobUpdateWithoutMembersInput, {
    nullable: false,
  })
  update!: MobUpdateWithoutMembersInput;

  @TypeGraphQL.Field((_type) => MobCreateWithoutMembersInput, {
    nullable: false,
  })
  create!: MobCreateWithoutMembersInput;

  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  where?: MobWhereInput | undefined;
}

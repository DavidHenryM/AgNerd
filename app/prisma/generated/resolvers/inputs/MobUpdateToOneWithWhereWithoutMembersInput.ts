import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobUpdateWithoutMembersInput } from "../inputs/MobUpdateWithoutMembersInput";
import { MobWhereInput } from "../inputs/MobWhereInput";

@TypeGraphQL.InputType("MobUpdateToOneWithWhereWithoutMembersInput", {})
export class MobUpdateToOneWithWhereWithoutMembersInput {
  @TypeGraphQL.Field((_type) => MobWhereInput, {
    nullable: true,
  })
  where?: MobWhereInput | undefined;

  @TypeGraphQL.Field((_type) => MobUpdateWithoutMembersInput, {
    nullable: false,
  })
  data!: MobUpdateWithoutMembersInput;
}

import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GrazeCreateNestedManyWithoutMobInput } from "../inputs/GrazeCreateNestedManyWithoutMobInput";
import { MobCreategrazeIdsInput } from "../inputs/MobCreategrazeIdsInput";

@TypeGraphQL.InputType("MobCreateWithoutMembersInput", {
  isAbstract: true
})
export class MobCreateWithoutMembersInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  comment?: string | undefined;

  @TypeGraphQL.Field(_type => MobCreategrazeIdsInput, {
    nullable: true
  })
  grazeIds?: MobCreategrazeIdsInput | undefined;

  @TypeGraphQL.Field(_type => GrazeCreateNestedManyWithoutMobInput, {
    nullable: true
  })
  graze?: GrazeCreateNestedManyWithoutMobInput | undefined;
}

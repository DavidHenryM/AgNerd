import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { MobCreateWithoutGrazeInput } from "../inputs/MobCreateWithoutGrazeInput";
import { MobWhereUniqueInput } from "../inputs/MobWhereUniqueInput";

@TypeGraphQL.InputType("MobCreateOrConnectWithoutGrazeInput", {})
export class MobCreateOrConnectWithoutGrazeInput {
  @TypeGraphQL.Field((_type) => MobWhereUniqueInput, {
    nullable: false,
  })
  where!: MobWhereUniqueInput;

  @TypeGraphQL.Field((_type) => MobCreateWithoutGrazeInput, {
    nullable: false,
  })
  create!: MobCreateWithoutGrazeInput;
}
